import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useGameStore } from '../src/state/store';
import { STOCKS } from '../src/data/stocks';
import { CONFIG } from '../src/data/config';
import { openCall, openPut, openShort, openStraddle, closePosition, canShort } from '../src/engine/options';

export default function ExchangeScreen() {
  const { game } = useGameStore();
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [modal, setModal] = useState<'call' | 'put' | 'short' | 'straddle' | null>(null);

  if (!game) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.placeholder}>Нет активной игры.</Text>
          <TouchableOpacity style={styles.menuBtn} onPress={() => router.replace('/')}>
            <Text style={styles.menuBtnText}>Меню</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentPlayer = game.players[game.currentPlayerIndex];
  const isHumanTurn = !currentPlayer?.isBot && !currentPlayer?.isEliminated;

  const handleAction = (type: 'call' | 'put' | 'short' | 'straddle', ticker: string) => {
    if (!isHumanTurn) {
      Alert.alert('Подождите', 'Сейчас ход другого игрока.');
      return;
    }
    setSelectedTicker(ticker);
    setModal(type);
  };

  const executeAction = (ticker: string, action: typeof modal) => {
    if (!action || !ticker) return;
    const store = useGameStore.getState();
    if (!store.game) return;
    const player = store.game.players[store.game.currentPlayerIndex];
    const currentPrice = store.game.stockPrices[ticker] ?? 5;
    let updated = player;

    switch (action) {
      case 'call':
        updated = openCall(player, ticker, currentPrice, CONFIG.OPTIONS_DEFAULT_SHARES, CONFIG.CALL_PREMIUM, store.game.turnNumber);
        break;
      case 'put':
        updated = openPut(player, ticker, currentPrice, CONFIG.OPTIONS_DEFAULT_SHARES, CONFIG.PUT_PREMIUM, store.game.turnNumber);
        break;
      case 'short': {
        const stock = STOCKS.find((s) => s.ticker === ticker)!;
        if (!canShort(currentPrice, stock.priceRange[1])) {
          Alert.alert('Нельзя шортить', `Акция должна быть у верхней границы (${stock.priceRange[1] * CONFIG.SHORT_AVAILABLE_THRESHOLD})`);
          return;
        }
        updated = openShort(player, ticker, CONFIG.OPTIONS_DEFAULT_SHARES, currentPrice, store.game.turnNumber);
        break;
      }
      case 'straddle':
        updated = openStraddle(player, ticker, currentPrice, CONFIG.OPTIONS_DEFAULT_SHARES, CONFIG.STRADDLE_PREMIUM, store.game.turnNumber);
        break;
    }

    const newPlayers = store.game.players.map((p, i) =>
      i === store.game!.currentPlayerIndex ? updated : p
    );
    const log = [...store.game.log, {
      turn: store.game.turnNumber,
      playerId: player.id,
      message: `${player.name} открыл(а) ${action} на ${ticker} по $${currentPrice}`,
      timestamp: Date.now(),
    }];

    useGameStore.setState({ game: { ...store.game, players: newPlayers, log } });
    store.saveGame();
    setModal(null);
  };

  const handleClosePosition = (posId: string) => {
    const store = useGameStore.getState();
    if (!store.game) return;
    const player = store.game.players[store.game.currentPlayerIndex];
    const pos = player.openPositions.find((p) => p.id === posId);
    if (!pos) return;
    const currentPrice = store.game.stockPrices[pos.ticker] ?? 0;
    const result = closePosition(player, posId, currentPrice);
    const newPlayers = store.game.players.map((p, i) =>
      i === store.game!.currentPlayerIndex ? result.player : p
    );
    const log = [...store.game.log, {
      turn: store.game.turnNumber,
      playerId: player.id,
      message: result.message,
      timestamp: Date.now(),
    }];
    useGameStore.setState({ game: { ...store.game, players: newPlayers, log } });
    store.saveGame();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Биржа / Опционы 202</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollInner}>
        {/* Stock list */}
        <Text style={styles.sectionTitle}>Акции</Text>
        {STOCKS.map((stock) => {
          const price = game.stockPrices[stock.ticker] ?? stock.startPrice;
          const [minP, maxP] = stock.priceRange;
          const pct = ((price - minP) / (maxP - minP)) * 100;
          const holding = currentPlayer?.balance.stocks.find((h) => h.ticker === stock.ticker);

          return (
            <View key={stock.ticker} style={styles.stockCard}>
              <View style={styles.stockHeader}>
                <Text style={styles.ticker}>{stock.ticker}</Text>
                <Text style={styles.price}>${price}</Text>
              </View>
              <Text style={styles.stockName}>{stock.name}</Text>
              <Text style={styles.stockDesc}>{stock.description}</Text>

              {/* Price range bar */}
              <View style={styles.rangeRow}>
                <Text style={styles.rangeLabel}>${minP}</Text>
                <View style={styles.rangeBar}>
                  <View style={[styles.rangeFill, { width: `${pct}%` }]} />
                </View>
                <Text style={styles.rangeLabel}>${maxP}</Text>
              </View>

              {holding && (
                <Text style={styles.holdingInfo}>
                  В портфеле: {holding.shares} акций · Ср. цена: ${holding.avgPrice}
                </Text>
              )}

              {/* Action buttons */}
              {isHumanTurn && (
                <View style={styles.actionRow}>
                  <ActionBtn label="Колл" onPress={() => handleAction('call', stock.ticker)} color="#22c55e" />
                  <ActionBtn label="Пут" onPress={() => handleAction('put', stock.ticker)} color="#f87171" />
                  <ActionBtn label="Шорт" onPress={() => handleAction('short', stock.ticker)} color="#f59e0b" />
                  <ActionBtn label="Страддл" onPress={() => handleAction('straddle', stock.ticker)} color="#a78bfa" />
                </View>
              )}
            </View>
          );
        })}

        {/* Open positions */}
        {(currentPlayer?.openPositions.filter((p) => p.status === 'open').length ?? 0) > 0 && (
          <>
            <Text style={styles.sectionTitle}>Открытые позиции</Text>
            {currentPlayer?.openPositions
              .filter((pos) => pos.status === 'open')
              .map((pos) => {
                const currentPrice = game.stockPrices[pos.ticker] ?? 0;
                return (
                  <View key={pos.id} style={styles.positionCard}>
                    <View style={styles.posHeader}>
                      <Text style={styles.posType}>{pos.type.toUpperCase()}</Text>
                      <Text style={styles.posTicker}>{pos.ticker}</Text>
                      <Text style={styles.posExpiry}>
                        Истекает: ход {pos.expiresAtTurn}
                      </Text>
                    </View>
                    <Text style={styles.posDetail}>
                      {pos.type !== 'short'
                        ? `Strike: $${pos.strike} · Акций: ${pos.shares} · Премия: $${pos.premium}`
                        : `Продан по: $${pos.shortSalePrice} · Акций: ${pos.shares} · Маржа: $${pos.margin}`}
                    </Text>
                    <Text style={styles.posPrice}>Текущая цена: ${currentPrice}</Text>
                    {isHumanTurn && (
                      <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={() => handleClosePosition(pos.id)}
                      >
                        <Text style={styles.closeBtnText}>Закрыть позицию</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
          </>
        )}

        {/* Costs reminder */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Стоимость опционов</Text>
          <Text style={styles.infoText}>Колл-опцион: ${CONFIG.CALL_PREMIUM.toLocaleString('ru')}</Text>
          <Text style={styles.infoText}>Пут-опцион: ${CONFIG.PUT_PREMIUM.toLocaleString('ru')}</Text>
          <Text style={styles.infoText}>Страддл: ${CONFIG.STRADDLE_PREMIUM.toLocaleString('ru')}</Text>
          <Text style={styles.infoText}>Шорт: цена × {CONFIG.OPTIONS_DEFAULT_SHARES} акций (маржа)</Text>
          <Text style={styles.infoText}>Экспирация: {CONFIG.OPTION_EXPIRY_TURNS} рыночных события</Text>
        </View>
      </ScrollView>

      {/* Confirm modal */}
      <Modal visible={!!modal} transparent animationType="slide">
        <View style={mstyles.overlay}>
          <View style={mstyles.container}>
            <Text style={mstyles.title}>
              {modal === 'call' && '📈 Опцион КОЛЛ'}
              {modal === 'put' && '📉 Опцион ПУТ'}
              {modal === 'short' && '⬇️ Короткая продажа'}
              {modal === 'straddle' && '↕️ Страддл'}
            </Text>
            <Text style={mstyles.ticker}>{selectedTicker}</Text>
            {modal === 'short' ? (
              <Text style={mstyles.cost}>
                Маржа: ${((game.stockPrices[selectedTicker ?? ''] ?? 5) * CONFIG.OPTIONS_DEFAULT_SHARES).toLocaleString('ru')}
              </Text>
            ) : (
              <Text style={mstyles.cost}>
                Премия: ${(modal === 'straddle' ? CONFIG.STRADDLE_PREMIUM : CONFIG.CALL_PREMIUM).toLocaleString('ru')}
              </Text>
            )}
            <TouchableOpacity
              style={mstyles.btnConfirm}
              onPress={() => executeAction(selectedTicker ?? '', modal)}
            >
              <Text style={mstyles.btnConfirmText}>Подтвердить</Text>
            </TouchableOpacity>
            <TouchableOpacity style={mstyles.btnCancel} onPress={() => setModal(null)}>
              <Text style={mstyles.btnCancelText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function ActionBtn({ label, onPress, color }: { label: string; onPress: () => void; color: string }) {
  return (
    <TouchableOpacity style={[styles.actionBtn, { borderColor: color }]} onPress={onPress}>
      <Text style={[styles.actionBtnText, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12, borderBottomWidth: 1, borderBottomColor: '#1e2a3a' },
  backBtn: { padding: 4 },
  backText: { color: '#2d7dff', fontSize: 16 },
  title: { color: '#e2e8f0', fontSize: 18, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollInner: { padding: 16, gap: 12, paddingBottom: 48 },
  sectionTitle: { color: '#f0c040', fontSize: 16, fontWeight: '700', marginTop: 8 },
  stockCard: { backgroundColor: '#111827', borderRadius: 14, padding: 14, gap: 6, borderWidth: 1, borderColor: '#1e2a3a' },
  stockHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ticker: { color: '#2d7dff', fontSize: 20, fontWeight: '800' },
  price: { color: '#f0c040', fontSize: 20, fontWeight: '800' },
  stockName: { color: '#e2e8f0', fontSize: 14, fontWeight: '600' },
  stockDesc: { color: '#94a3b8', fontSize: 12 },
  rangeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  rangeLabel: { color: '#64748b', fontSize: 11, width: 28 },
  rangeBar: { flex: 1, height: 6, backgroundColor: '#1e2a3a', borderRadius: 3, overflow: 'hidden' },
  rangeFill: { height: '100%', backgroundColor: '#2d7dff', borderRadius: 3 },
  holdingInfo: { color: '#4ade80', fontSize: 12 },
  actionRow: { flexDirection: 'row', gap: 6, marginTop: 6 },
  actionBtn: { flex: 1, borderWidth: 1, borderRadius: 8, paddingVertical: 8, alignItems: 'center' },
  actionBtnText: { fontSize: 12, fontWeight: '700' },
  positionCard: { backgroundColor: '#0e1726', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#2d4060' },
  posHeader: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  posType: { color: '#f0c040', fontSize: 14, fontWeight: '800' },
  posTicker: { color: '#2d7dff', fontSize: 14, fontWeight: '700' },
  posExpiry: { color: '#94a3b8', fontSize: 12, flex: 1, textAlign: 'right' },
  posDetail: { color: '#cbd5e1', fontSize: 12, marginTop: 4 },
  posPrice: { color: '#4ade80', fontSize: 12 },
  closeBtn: { marginTop: 8, backgroundColor: '#1e2a3a', borderRadius: 8, padding: 10, alignItems: 'center' },
  closeBtnText: { color: '#f87171', fontSize: 13, fontWeight: '600' },
  infoBox: { backgroundColor: '#111827', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#1e3a5f' },
  infoTitle: { color: '#94a3b8', fontSize: 13, fontWeight: '700', marginBottom: 6 },
  infoText: { color: '#64748b', fontSize: 12, marginBottom: 2 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholder: { color: '#94a3b8', fontSize: 16, marginBottom: 24 },
  menuBtn: { backgroundColor: '#2d7dff', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 32 },
  menuBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

const mstyles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  container: { backgroundColor: '#111827', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 12 },
  title: { color: '#e2e8f0', fontSize: 22, fontWeight: '800' },
  ticker: { color: '#2d7dff', fontSize: 28, fontWeight: '900' },
  cost: { color: '#f0c040', fontSize: 16 },
  btnConfirm: { backgroundColor: '#2d7dff', borderRadius: 12, padding: 16, alignItems: 'center' },
  btnConfirmText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  btnCancel: { borderWidth: 1, borderColor: '#334155', borderRadius: 12, padding: 14, alignItems: 'center' },
  btnCancelText: { color: '#94a3b8', fontSize: 15 },
});
