import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { Player } from '../types';
import {
  calcPassiveIncome,
  calcTotalExpenses,
  calcTotalIncome,
  calcCashflow,
  calcTotalAssets,
  calcTotalLiabilities,
} from '../engine/financials';
import { CONFIG } from '../data/config';

interface Props {
  player: Player;
  stockPrices: Record<string, number>;
  savingsRate?: number;
}

export default function FinancialReport({ player, stockPrices, savingsRate = CONFIG.SAVINGS_ANNUAL_INTEREST_RATE }: Props) {
  const passive = calcPassiveIncome(player, savingsRate);
  const expenses = calcTotalExpenses(player);
  const totalIncome = calcTotalIncome(player, savingsRate);
  const cashflow = calcCashflow(player, savingsRate);
  const totalAssets = calcTotalAssets(player, stockPrices);
  const totalLiabilities = calcTotalLiabilities(player);
  const exitProgress = Math.min(1, passive / Math.max(1, expenses));

  const $ = (n: number) => `$${n.toLocaleString('ru')}`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.inner}>
      {/* Header */}
      <Text style={styles.name}>{player.name}</Text>
      <Text style={styles.profession}>{player.professionId}</Text>

      {/* Rat Race exit progress */}
      {!player.onFastTrack && (
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>
            Прогресс выхода из Крысиных бегов
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${exitProgress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {$(passive)} / {$(expenses)} ({Math.round(exitProgress * 100)}%)
          </Text>
        </View>
      )}

      {/* Income Statement */}
      <SectionTitle title="Отчёт о доходах" />
      <Row label="Зарплата" value={$(player.income.salary)} positive />
      <Row label="Проценты" value={$(player.income.interest)} positive />
      <Row label="Дивиденды" value={$(player.income.dividends)} positive />
      <Row label="Недвижимость" value={$(player.income.realEstateFlow)} positive />
      <Row label="Бизнесы" value={$(player.income.businessFlow)} positive />
      <Row label="Итого доход" value={$(totalIncome)} positive bold />
      <Separator />
      <Row label="Налоги" value={$(player.income.taxes)} />
      <Row label="Ипотека (дом)" value={$(player.income.mortgage)} />
      <Row label="Учебный кредит" value={$(player.income.studentLoan)} />
      <Row label="Автокредит" value={$(player.income.carLoan)} />
      <Row label="Кредитные карты" value={$(player.income.creditCards)} />
      <Row label="Потребит. долг" value={$(player.income.consumerDebt)} />
      <Row label="Расходы на детей" value={$(player.income.childExpenses)} />
      <Row label="Прочие расходы" value={$(player.income.otherExpenses)} />
      <Row label="Банковские займы" value={$(player.income.bankLoanPayments)} />
      <Row label="Итого расходы" value={$(expenses)} bold />
      <Separator />
      <Row
        label="💰 ДЕНЕЖНЫЙ ПОТОК"
        value={$(cashflow)}
        positive={cashflow >= 0}
        bold
        large
      />

      {/* Balance Sheet */}
      <SectionTitle title="Баланс — Активы" />
      <Row label="Сбережения" value={$(player.balance.savings)} positive />
      {player.balance.stocks.map((s) => (
        <Row
          key={s.id}
          label={`Акции ${s.ticker} ×${s.shares}`}
          value={`$${((stockPrices[s.ticker] ?? s.avgPrice) * s.shares).toLocaleString('ru')}`}
          positive
        />
      ))}
      {player.balance.realEstate.map((r) => (
        <Row key={r.id} label={r.name} value={$(r.purchasePrice)} positive />
      ))}
      {player.balance.businesses.map((b) => (
        <Row key={b.id} label={b.name} value={$(b.purchasePrice)} positive />
      ))}
      <Row label="Итого активы" value={$(totalAssets)} positive bold />

      <SectionTitle title="Баланс — Пассивы" />
      <Row label="Ипотека (дом)" value={$(player.balance.homeMortgage)} />
      <Row label="Учебный кредит" value={$(player.balance.studentLoanBalance)} />
      <Row label="Автокредит" value={$(player.balance.carLoanBalance)} />
      <Row label="Кредитные карты" value={$(player.balance.creditCardBalance)} />
      <Row label="Потребит. долг" value={$(player.balance.consumerDebtBalance)} />
      <Row label="Ипотеки на инвест." value={$(player.balance.investmentMortgages)} />
      <Row label="Банковские займы" value={$(player.balance.bankLoan)} />
      <Row label="Итого пассивы" value={$(totalLiabilities)} bold />
    </ScrollView>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function Row({ label, value, positive = false, bold = false, large = false }: {
  label: string;
  value: string;
  positive?: boolean;
  bold?: boolean;
  large?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, bold && styles.bold, large && styles.large]}>{label}</Text>
      <Text style={[
        styles.rowValue,
        positive ? styles.positiveValue : styles.negativeValue,
        bold && styles.bold,
        large && styles.large,
      ]}>{value}</Text>
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  inner: { padding: 16, paddingBottom: 48 },
  name: { color: '#f0c040', fontSize: 22, fontWeight: '800', marginBottom: 2 },
  profession: { color: '#94a3b8', fontSize: 14, marginBottom: 16 },
  progressSection: { marginBottom: 20, backgroundColor: '#111827', borderRadius: 12, padding: 14 },
  progressLabel: { color: '#94a3b8', fontSize: 13, marginBottom: 8 },
  progressBar: { height: 8, backgroundColor: '#1e3a5f', borderRadius: 4, overflow: 'hidden', marginBottom: 4 },
  progressFill: { height: '100%', backgroundColor: '#22c55e', borderRadius: 4 },
  progressText: { color: '#e2e8f0', fontSize: 12, textAlign: 'right' },
  sectionHeader: { backgroundColor: '#1e2a3a', padding: 10, marginTop: 16, marginBottom: 4, borderRadius: 8 },
  sectionTitle: { color: '#f0c040', fontSize: 15, fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 0.5, borderBottomColor: '#1e2a3a' },
  rowLabel: { color: '#cbd5e1', fontSize: 14, flex: 1 },
  rowValue: { fontSize: 14, textAlign: 'right', minWidth: 80 },
  positiveValue: { color: '#4ade80' },
  negativeValue: { color: '#f87171' },
  bold: { fontWeight: '700' },
  large: { fontSize: 17 },
  separator: { height: 1, backgroundColor: '#2d4060', marginVertical: 6 },
});
