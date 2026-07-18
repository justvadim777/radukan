import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RulesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Правила игры</Text>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollInner}>
        <Section title="Цель игры">
          Достичь финансовой свободы: вырваться из «Крысиных бегов» (пассивный доход
          превышает расходы), а затем на «Скоростной дорожке» купить свою Мечту или
          нарастить денежный поток на +50 000 $/мес.
        </Section>

        <Section title="Два круга">
          <Bold>Крысиные бега</Bold> — внутренний круг, один кубик.{'\n'}
          <Bold>Скоростная дорожка</Bold> — внешний круг, два кубика.
        </Section>

        <Section title="Финансовый отчёт">
          Каждый игрок ведёт Отчёт о доходах (зарплата + пассивный доход − расходы =
          Денежный поток) и Баланс (активы и пассивы). Пассивный доход = проценты +
          дивиденды + поток от недвижимости + поток от бизнеса.
        </Section>

        <Section title="Клетки поля">
          <Bold>Расчётный день</Bold> — получить денежный поток.{'\n'}
          <Bold>Возможность</Bold> — взять карту малой или крупной сделки.{'\n'}
          <Bold>Рынок</Bold> — событие, меняющее цены активов.{'\n'}
          <Bold>Мелкие расходы</Bold> — незапланированная трата.{'\n'}
          <Bold>Благотворительность</Bold> — 10% дохода, но +гибкость бросков.{'\n'}
          <Bold>Ребёнок</Bold> — +1 ребёнок, растут расходы (макс. 3).{'\n'}
          <Bold>Сокращение</Bold> — заплатить все расходы + пропустить 2 хода.
        </Section>

        <Section title="Механики 202 (продвинутые)">
          <Bold>Опцион колл</Bold> — право купить акцию по цене исполнения.{'\n'}
          <Bold>Опцион пут</Bold> — право продать акцию по цене исполнения.{'\n'}
          <Bold>Короткая продажа</Bold> — заработок на падении цены.{'\n'}
          <Bold>Страддл</Bold> — колл + пут одновременно, ставка на движение.{'\n'}
          Все опционы действуют 3 рыночных события, затем истекают.
        </Section>

        <Section title="Банковский заём">
          Кратен 1 000 $. Ставка: +100 $/мес на каждые 1 000 $. Погашается
          кусками по 1 000 $.
        </Section>

        <Section title="Банкротство">
          Нельзя покрыть отрицательный поток: принудительная продажа активов
          за 50% первоначального взноса → списание части долгов → выбывание.
        </Section>

        <Section title="Победа на Скоростной дорожке">
          Купить свою Мечту ИЛИ нарастить денежный поток на +50 000 $/мес
          к стартовому доходу после выхода из Крысиных бегов.
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      <Text style={s.sectionBody}>{children}</Text>
    </View>
  );
}

function Bold({ children }: { children: React.ReactNode }) {
  return <Text style={{ fontWeight: '700', color: '#f0c040' }}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  backBtn: { padding: 8 },
  backText: { color: '#2d7dff', fontSize: 16 },
  title: { color: '#e2e8f0', fontSize: 20, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollInner: { padding: 20, paddingBottom: 48 },
});

const s = StyleSheet.create({
  section: {
    marginBottom: 24,
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#2d7dff',
  },
  sectionTitle: {
    color: '#f0c040',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionBody: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 22,
  },
});
