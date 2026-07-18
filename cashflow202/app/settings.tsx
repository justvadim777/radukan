import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGameStore } from '../src/state/store';
import { CONFIG } from '../src/data/config';

export default function SettingsScreen() {
  const { clearGame } = useGameStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Настройки</Text>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollInner}>
        <Section title="Параметры игры">
          <InfoRow label="Банковский займ" value={`$${CONFIG.BANK_LOAN_UNIT.toLocaleString('ru')} / $${CONFIG.BANK_LOAN_MONTHLY_RATE}/мес`} />
          <InfoRow label="Срок опциона" value={`${CONFIG.OPTION_EXPIRY_TURNS} рыночных события`} />
          <InfoRow label="Премия колл/пут" value={`$${CONFIG.CALL_PREMIUM} / $${CONFIG.PUT_PREMIUM}`} />
          <InfoRow label="Премия страддл" value={`$${CONFIG.STRADDLE_PREMIUM}`} />
          <InfoRow label="Цель Fast Track" value={`+$${CONFIG.FAST_TRACK_CASHFLOW_BONUS.toLocaleString('ru')}/мес`} />
          <InfoRow label="Мультипл. выкупа" value={`${CONFIG.BUYOUT_MULTIPLIER}× пассивный доход`} />
          <InfoRow label="Макс. детей" value={`${CONFIG.MAX_CHILDREN}`} />
          <InfoRow label="Пропуск при сокращ." value={`${CONFIG.DOWNSIZED_TURNS_SKIPPED} хода`} />
        </Section>

        <Section title="Сбросить прогресс">
          <Text style={styles.warningText}>Удалить сохранённую игру?</Text>
          <TouchableOpacity
            style={styles.dangerBtn}
            onPress={() => {
              clearGame();
              router.replace('/');
            }}
          >
            <Text style={styles.dangerBtnText}>🗑 Сбросить сохранение</Text>
          </TouchableOpacity>
        </Section>

        <Section title="О приложении">
          <InfoRow label="Версия" value="1.0.0" />
          <InfoRow label="Игра" value="Денежный поток 202" />
          <InfoRow label="Разработчик" value="claude-sonnet-4-6" />
          <Text style={styles.note}>
            Все параметры баланса хранятся в {'\n'}cashflow202/src/data/config.ts
          </Text>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12, borderBottomWidth: 1, borderBottomColor: '#1e2a3a' },
  backBtn: { padding: 4 },
  backText: { color: '#2d7dff', fontSize: 16 },
  title: { color: '#e2e8f0', fontSize: 20, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollInner: { padding: 16, paddingBottom: 48, gap: 16 },
  section: { backgroundColor: '#111827', borderRadius: 14, overflow: 'hidden' },
  sectionTitle: { color: '#f0c040', fontSize: 14, fontWeight: '700', padding: 14, borderBottomWidth: 1, borderBottomColor: '#1e2a3a' },
  sectionBody: { padding: 12, gap: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  rowLabel: { color: '#94a3b8', fontSize: 13 },
  rowValue: { color: '#e2e8f0', fontSize: 13, fontWeight: '600' },
  warningText: { color: '#94a3b8', fontSize: 13, marginBottom: 8 },
  dangerBtn: { backgroundColor: '#1e1010', borderWidth: 1, borderColor: '#ef4444', borderRadius: 10, padding: 14, alignItems: 'center' },
  dangerBtnText: { color: '#ef4444', fontSize: 14, fontWeight: '700' },
  note: { color: '#475569', fontSize: 11, marginTop: 4, lineHeight: 16 },
});
