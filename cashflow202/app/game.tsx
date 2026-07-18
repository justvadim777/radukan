import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { useGameStore } from '../src/state/store';
import FinancialReport from '../src/components/FinancialReport';
import { RAT_RACE_BOARD, FAST_TRACK_BOARD } from '../src/engine/board';
import type { Deal, MarketCard } from '../src/types';
import { CONFIG } from '../src/data/config';
import { decideBotAction } from '../src/ai/botPolicy';

// ─── Dice animation ───────────────────────────────────────────────────────────

function DiceButton({ onRoll, disabled }: { onRoll: () => void; disabled: boolean }) {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handlePress = () => {
    rotation.value = withSequence(
      withRepeat(withTiming(360, { duration: 80 }), 5, false),
      withTiming(0, { duration: 0 })
    );
    setTimeout(onRoll, 400);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={[styles.diceButton, disabled && styles.diceButtonDisabled]}
      activeOpacity={0.7}
    >
      <Animated.Text style={[styles.diceEmoji, animatedStyle]}>🎲</Animated.Text>
      <Text style={styles.diceLabel}>{disabled ? 'Ждём...' : 'Бросить!'}</Text>
    </TouchableOpacity>
  );
}

// ─── Board visual (simplified ring) ──────────────────────────────────────────

function BoardRing({
  cells,
  currentPos,
  label,
  isOuter,
}: {
  cells: typeof RAT_RACE_BOARD;
  currentPos: number;
  label: string;
  isOuter: boolean;
}) {
  return (
    <View style={[styles.ringContainer, isOuter && styles.ringOuter]}>
      <Text style={styles.ringLabel}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ringScroll}>
        {cells.map((cell, i) => (
          <View
            key={i}
            style={[
              styles.cell,
              i === currentPos && styles.cellActive,
              getCellStyle(cell.type as string),
            ]}
          >
            <Text style={styles.cellIndex}>{i + 1}</Text>
            <Text style={styles.cellLabel} numberOfLines={2}>{cell.label}</Text>
            {i === currentPos && <Text style={styles.cellToken}>▲</Text>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function getCellStyle(type: string) {
  switch (type) {
    case 'payday':
    case 'cashflow-day': return { borderColor: '#22c55e' };
    case 'opportunity':
    case 'business':     return { borderColor: '#f0c040' };
    case 'market':       return { borderColor: '#60a5fa' };
    case 'doodad':       return { borderColor: '#f87171' };
    case 'charity':      return { borderColor: '#a78bfa' };
    case 'baby':         return { borderColor: '#fb923c' };
    case 'downsized':    return { borderColor: '#ef4444' };
    case 'dream':        return { borderColor: '#f472b6' };
    case 'tax-audit':
    case 'lawsuit':
    case 'divorce':      return { borderColor: '#dc2626' };
    default:             return {};
  }
}

// ─── Event modals ─────────────────────────────────────────────────────────────

function DealModal({ deal, onBuy, onSkip, playerSavings }: {
  deal: Deal;
  onBuy: () => void;
  onSkip: () => void;
  playerSavings: number;
}) {
  const canAfford = playerSavings >= deal.downPayment;
  return (
    <View style={modal.container}>
      <Text style={modal.badge}>{deal.size === 'small' ? '🟡 Малая сделка' : '🟠 Крупная сделка'}</Text>
      <Text style={modal.title}>{deal.title}</Text>
      <Text style={modal.desc}>{deal.description}</Text>
      <View style={modal.rows}>
        <ModalRow label="Цена" value={`$${deal.price.toLocaleString('ru')}`} />
        <ModalRow label="Первый взнос" value={`$${deal.downPayment.toLocaleString('ru')}`} highlight />
        {deal.loanAmount > 0 && <ModalRow label="Займ" value={`$${deal.loanAmount.toLocaleString('ru')}`} />}
        {deal.monthlyFlow !== 0 && (
          <ModalRow
            label="Доп. поток"
            value={`${deal.monthlyFlow >= 0 ? '+' : ''}$${deal.monthlyFlow.toLocaleString('ru')}/мес`}
            positive={deal.monthlyFlow > 0}
          />
        )}
        {deal.priceRange && (
          <ModalRow
            label="Диапазон цены"
            value={`$${deal.priceRange[0].toLocaleString('ru')} – $${deal.priceRange[1].toLocaleString('ru')}`}
          />
        )}
      </View>
      <Text style={[modal.savings, !canAfford && { color: '#f87171' }]}>
        Ваши сбережения: ${playerSavings.toLocaleString('ru')}
      </Text>
      <View style={modal.buttons}>
        <TouchableOpacity
          style={[modal.btnBuy, !canAfford && modal.btnDisabled]}
          onPress={onBuy}
          disabled={!canAfford}
        >
          <Text style={modal.btnBuyText}>
            {canAfford ? '✅ Купить' : '❌ Не хватает денег'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={modal.btnSkip} onPress={onSkip}>
          <Text style={modal.btnSkipText}>Пропустить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ModalRow({ label, value, highlight = false, positive = false }: {
  label: string; value: string; highlight?: boolean; positive?: boolean;
}) {
  return (
    <View style={modal.row}>
      <Text style={modal.rowLabel}>{label}</Text>
      <Text style={[modal.rowValue, highlight && { color: '#f0c040' }, positive && { color: '#4ade80' }]}>
        {value}
      </Text>
    </View>
  );
}

// ─── Main Game Screen ─────────────────────────────────────────────────────────

export default function GameScreen() {
  const {
    game, rollDice: storeRoll, buyDeal, skipDeal, acceptMarket,
    payDoodad, doCharity, addBaby, applyDownsized, endTurn, loadGame,
  } = useGameStore();

  const [tab, setTab] = useState<'board' | 'report'>('board');
  const [dealSize, setDealSize] = useState<'small' | 'large'>('small');
  const botTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!game) {
      loadGame();
    }
  }, []);

  useEffect(() => {
    if (!game) return;
    const current = game.players[game.currentPlayerIndex];
    if (!current || !current.isBot || current.isEliminated || game.winnerId) return;

    // Bot's turn — auto-play after delay
    botTimerRef.current = setTimeout(() => {
      if (game.pendingEvent) {
        const action = decideBotAction(game, current);
        switch (action.type) {
          case 'buy-deal':
            if (action.deal) buyDeal(action.deal, action.deal.size);
            else skipDeal();
            break;
          case 'skip-deal':
            skipDeal();
            break;
          case 'charity':
            doCharity(true);
            break;
          case 'no-charity':
            doCharity(false);
            break;
          default:
            // For doodad, market, baby, downsized — auto accept
            if (game.pendingEvent.type === 'doodad') {
              const cost = game.pendingEvent.doodadCost ?? 0;
              payDoodad(cost, current.balance.savings < cost);
            } else if (game.pendingEvent.type === 'market-event') {
              if (game.pendingEvent.marketCard) acceptMarket(game.pendingEvent.marketCard);
            } else if (game.pendingEvent.type === 'baby') {
              addBaby();
            } else if (game.pendingEvent.type === 'downsized') {
              applyDownsized();
            } else {
              skipDeal();
            }
        }
      } else {
        storeRoll();
        setTimeout(() => endTurn(), CONFIG.BOT_TURN_DELAY_MS);
      }
    }, CONFIG.BOT_TURN_DELAY_MS);

    return () => { if (botTimerRef.current) clearTimeout(botTimerRef.current); };
  }, [game?.currentPlayerIndex, game?.pendingEvent, game?.turnNumber]);

  if (!game) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.placeholder}>Нет активной игры.</Text>
          <TouchableOpacity style={styles.menuBtn} onPress={() => router.replace('/')}>
            <Text style={styles.menuBtnText}>Главное меню</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (game.winnerId) {
    const winner = game.players.find((p) => p.id === game.winnerId);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.victory}>
          <Text style={styles.victoryEmoji}>🏆</Text>
          <Text style={styles.victoryTitle}>ПОБЕДИТЕЛЬ!</Text>
          <Text style={styles.victoryName}>{winner?.name ?? '—'}</Text>
          <Text style={styles.victoryTurns}>Ходов сыграно: {game.turnNumber}</Text>
          <TouchableOpacity style={styles.menuBtn} onPress={() => router.replace('/')}>
            <Text style={styles.menuBtnText}>Главное меню</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentPlayer = game.players[game.currentPlayerIndex];
  const isHumanTurn = !currentPlayer?.isBot && !currentPlayer?.isEliminated;
  const event = game.pendingEvent;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/')} style={styles.backBtn}>
          <Text style={styles.backText}>← Меню</Text>
        </TouchableOpacity>
        <View style={styles.headerMid}>
          <Text style={styles.turnLabel}>Ход {game.turnNumber}</Text>
          <Text style={styles.currentPlayerName}>
            {currentPlayer?.onFastTrack ? '🏎 ' : '🐀 '}{currentPlayer?.name ?? '—'}
          </Text>
        </View>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, tab === 'board' && styles.tabActive]}
            onPress={() => setTab('board')}
          >
            <Text style={styles.tabText}>Поле</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === 'report' && styles.tabActive]}
            onPress={() => setTab('report')}
          >
            <Text style={styles.tabText}>Отчёт</Text>
          </TouchableOpacity>
        </View>
      </View>

      {tab === 'board' ? (
        <>
          {/* Board */}
          <ScrollView style={styles.boardScroll}>
            {/* Fast Track players */}
            {game.players.some((p) => p.onFastTrack) && (
              <BoardRing
                cells={FAST_TRACK_BOARD}
                currentPos={currentPlayer?.onFastTrack ? currentPlayer.position : -1}
                label="🏎 Скоростная дорожка"
                isOuter
              />
            )}
            {/* Rat Race */}
            {!currentPlayer?.onFastTrack && (
              <BoardRing
                cells={RAT_RACE_BOARD}
                currentPos={currentPlayer?.position ?? 0}
                label="🐀 Крысиные бега"
                isOuter={false}
              />
            )}

            {/* Players summary */}
            <View style={styles.playersList}>
              {game.players.map((p) => (
                <View key={p.id} style={[styles.playerChip, p.id === currentPlayer?.id && styles.playerChipActive]}>
                  <Text style={styles.playerChipName}>{p.onFastTrack ? '🏎' : '🐀'} {p.name}</Text>
                  <Text style={styles.playerChipSavings}>${p.balance.savings.toLocaleString('ru')}</Text>
                </View>
              ))}
            </View>

            {/* Event log */}
            <View style={styles.log}>
              <Text style={styles.logTitle}>Лог событий</Text>
              {[...game.log].reverse().slice(0, 10).map((entry, i) => (
                <Text key={i} style={styles.logEntry}>• {entry.message}</Text>
              ))}
            </View>
          </ScrollView>

          {/* Action buttons */}
          {isHumanTurn && !event && (
            <View style={styles.actions}>
              <DiceButton onRoll={() => { storeRoll(); setTimeout(() => endTurn(), 300); }} disabled={false} />
            </View>
          )}
          {isHumanTurn && !event && (
            <View style={styles.dealSizeRow}>
              <TouchableOpacity
                style={[styles.sizeBtn, dealSize === 'small' && styles.sizeBtnActive]}
                onPress={() => setDealSize('small')}
              >
                <Text style={styles.sizeBtnText}>Малая</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sizeBtn, dealSize === 'large' && styles.sizeBtnActive]}
                onPress={() => setDealSize('large')}
              >
                <Text style={styles.sizeBtnText}>Крупная</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <FinancialReport
          player={currentPlayer}
          stockPrices={game.stockPrices}
        />
      )}

      {/* Pending event modal */}
      <Modal
        visible={!!event && isHumanTurn}
        transparent
        animationType="slide"
      >
        <View style={modal.overlay}>
          {event?.type === 'deal-offer' && (
            <>
              {/* Choose deal size then show deal */}
              <View style={modal.container}>
                <Text style={modal.title}>Возможность!</Text>
                <Text style={modal.desc}>Выберите тип сделки</Text>
                <TouchableOpacity
                  style={modal.btnBuy}
                  onPress={() => {
                    const deal = game.smallDealDeck[0];
                    if (deal) buyDeal(deal, 'small');
                    else skipDeal();
                  }}
                >
                  <Text style={modal.btnBuyText}>🟡 Малая сделка</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[modal.btnBuy, { marginTop: 8, backgroundColor: '#b45309' }]}
                  onPress={() => {
                    const deal = game.largeDealDeck[0];
                    if (deal) buyDeal(deal, 'large');
                    else skipDeal();
                  }}
                >
                  <Text style={modal.btnBuyText}>🟠 Крупная сделка</Text>
                </TouchableOpacity>
                <TouchableOpacity style={modal.btnSkip} onPress={skipDeal}>
                  <Text style={modal.btnSkipText}>Пропустить</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {event?.type === 'market-event' && event.marketCard && (
            <View style={modal.container}>
              <Text style={modal.badge}>📊 Рынок</Text>
              <Text style={modal.title}>{event.marketCard.title}</Text>
              <Text style={modal.desc}>{event.marketCard.description}</Text>
              <TouchableOpacity style={modal.btnBuy} onPress={() => acceptMarket(event.marketCard as MarketCard)}>
                <Text style={modal.btnBuyText}>OK</Text>
              </TouchableOpacity>
            </View>
          )}

          {event?.type === 'doodad' && event.doodad && (
            <View style={modal.container}>
              <Text style={modal.badge}>💸 Мелкие расходы</Text>
              <Text style={modal.title}>{event.doodad.title}</Text>
              <Text style={modal.desc}>{event.doodad.description}</Text>
              <Text style={modal.desc}>Стоимость: ${event.doodadCost?.toLocaleString('ru')}</Text>
              <TouchableOpacity
                style={modal.btnBuy}
                onPress={() => payDoodad(event.doodadCost ?? 0, false)}
              >
                <Text style={modal.btnBuyText}>Заплатить из кармана</Text>
              </TouchableOpacity>
              {(currentPlayer?.balance.savings ?? 0) < (event.doodadCost ?? 0) && (
                <TouchableOpacity
                  style={[modal.btnBuy, { backgroundColor: '#7c3aed' }]}
                  onPress={() => payDoodad(event.doodadCost ?? 0, true)}
                >
                  <Text style={modal.btnBuyText}>Взять кредит</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {event?.type === 'charity' && (
            <View style={modal.container}>
              <Text style={modal.badge}>💜 Благотворительность</Text>
              <Text style={modal.title}>Сделать пожертвование?</Text>
              <Text style={modal.desc}>
                10% вашего дохода = $
                {Math.floor((currentPlayer?.income.salary ?? 0) * CONFIG.CHARITY_PAYOUT_FRACTION).toLocaleString('ru')}
              </Text>
              <Text style={modal.desc}>
                Взамен — {CONFIG.CHARITY_DICE_CHOICE_TURNS} хода с выбором 1 или 2 кубика.
              </Text>
              <TouchableOpacity style={modal.btnBuy} onPress={() => doCharity(true)}>
                <Text style={modal.btnBuyText}>Пожертвовать</Text>
              </TouchableOpacity>
              <TouchableOpacity style={modal.btnSkip} onPress={() => doCharity(false)}>
                <Text style={modal.btnSkipText}>Пропустить</Text>
              </TouchableOpacity>
            </View>
          )}

          {event?.type === 'baby' && (
            <View style={modal.container}>
              <Text style={modal.badge}>👶 Ребёнок!</Text>
              <Text style={modal.title}>У вас пополнение в семье!</Text>
              <Text style={modal.desc}>Расходы на детей вырастут.</Text>
              <TouchableOpacity style={modal.btnBuy} onPress={addBaby}>
                <Text style={modal.btnBuyText}>OK</Text>
              </TouchableOpacity>
            </View>
          )}

          {event?.type === 'downsized' && (
            <View style={modal.container}>
              <Text style={modal.badge}>📉 Сокращение!</Text>
              <Text style={modal.title}>Вас сократили!</Text>
              <Text style={modal.desc}>
                Оплатите все расходы и пропустите {CONFIG.DOWNSIZED_TURNS_SKIPPED} хода.
              </Text>
              <TouchableOpacity style={modal.btnBuy} onPress={applyDownsized}>
                <Text style={modal.btnBuyText}>OK</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#1e2a3a' },
  backBtn: { padding: 4 },
  backText: { color: '#2d7dff', fontSize: 14 },
  headerMid: { flex: 1, alignItems: 'center' },
  turnLabel: { color: '#64748b', fontSize: 11 },
  currentPlayerName: { color: '#f0c040', fontSize: 16, fontWeight: '700' },
  tabs: { flexDirection: 'row', gap: 4 },
  tab: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, backgroundColor: '#1e2a3a' },
  tabActive: { backgroundColor: '#2d7dff' },
  tabText: { color: '#e2e8f0', fontSize: 13 },
  boardScroll: { flex: 1 },
  ringContainer: { margin: 10, backgroundColor: '#0e1726', borderRadius: 12, padding: 10 },
  ringOuter: { borderColor: '#f472b6', borderWidth: 1 },
  ringLabel: { color: '#94a3b8', fontSize: 12, marginBottom: 6 },
  ringScroll: {},
  cell: {
    width: 72, height: 72, margin: 3, borderRadius: 8, borderWidth: 2,
    borderColor: '#1e2a3a', backgroundColor: '#111827',
    alignItems: 'center', justifyContent: 'center', padding: 3,
  },
  cellActive: { backgroundColor: '#1e3a5f' },
  cellIndex: { color: '#475569', fontSize: 10, position: 'absolute', top: 3, right: 5 },
  cellLabel: { color: '#cbd5e1', fontSize: 9, textAlign: 'center' },
  cellToken: { color: '#f0c040', fontSize: 16, position: 'absolute', bottom: 2 },
  playersList: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, gap: 6 },
  playerChip: { backgroundColor: '#111827', borderRadius: 10, padding: 8, flexDirection: 'row', gap: 6, borderWidth: 1, borderColor: '#1e2a3a' },
  playerChipActive: { borderColor: '#f0c040' },
  playerChipName: { color: '#e2e8f0', fontSize: 13 },
  playerChipSavings: { color: '#4ade80', fontSize: 13, fontWeight: '700' },
  log: { margin: 10, backgroundColor: '#0e1726', borderRadius: 10, padding: 12 },
  logTitle: { color: '#64748b', fontSize: 12, marginBottom: 6 },
  logEntry: { color: '#94a3b8', fontSize: 12, marginBottom: 3 },
  actions: { padding: 12 },
  diceButton: { backgroundColor: '#2d7dff', borderRadius: 16, padding: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10 },
  diceButtonDisabled: { backgroundColor: '#1e3a5f' },
  diceEmoji: { fontSize: 32 },
  diceLabel: { color: '#fff', fontSize: 18, fontWeight: '700' },
  dealSizeRow: { flexDirection: 'row', padding: 8, gap: 8, paddingBottom: 0 },
  sizeBtn: { flex: 1, backgroundColor: '#111827', borderRadius: 10, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#1e2a3a' },
  sizeBtnActive: { borderColor: '#f0c040' },
  sizeBtnText: { color: '#e2e8f0', fontSize: 14 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholder: { color: '#94a3b8', fontSize: 16, marginBottom: 24 },
  menuBtn: { backgroundColor: '#2d7dff', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 32 },
  menuBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  victory: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  victoryEmoji: { fontSize: 80 },
  victoryTitle: { color: '#f0c040', fontSize: 36, fontWeight: '900' },
  victoryName: { color: '#e2e8f0', fontSize: 24, fontWeight: '700' },
  victoryTurns: { color: '#94a3b8', fontSize: 14 },
});

const modal = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  container: { backgroundColor: '#111827', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 10 },
  badge: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  title: { color: '#e2e8f0', fontSize: 22, fontWeight: '800', marginBottom: 2 },
  desc: { color: '#94a3b8', fontSize: 14, lineHeight: 20 },
  rows: { backgroundColor: '#0e1726', borderRadius: 10, padding: 12, gap: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  rowLabel: { color: '#94a3b8', fontSize: 14 },
  rowValue: { color: '#e2e8f0', fontSize: 14, fontWeight: '600' },
  savings: { color: '#4ade80', fontSize: 14 },
  buttons: { flexDirection: 'column', gap: 8 },
  btnBuy: { backgroundColor: '#2d7dff', borderRadius: 12, padding: 16, alignItems: 'center' },
  btnBuyText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  btnDisabled: { backgroundColor: '#1e3a5f' },
  btnSkip: { borderWidth: 1, borderColor: '#334155', borderRadius: 12, padding: 14, alignItems: 'center' },
  btnSkipText: { color: '#94a3b8', fontSize: 15 },
});
