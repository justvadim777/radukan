import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useGameStore } from '../src/state/store';
import { PROFESSIONS } from '../src/data/professions';
import { DREAMS } from '../src/data/dreams';
import type { BotLevel } from '../src/types';

export default function SetupScreen() {
  const { newGame } = useGameStore();
  const [playerName, setPlayerName] = useState('Игрок');
  const [selectedProfession, setSelectedProfession] = useState(PROFESSIONS[0].id);
  const [selectedDream, setSelectedDream] = useState(DREAMS[0].id);
  const [botCount, setBotCount] = useState(2);
  const [botLevel, setBotLevel] = useState<BotLevel>('medium');

  const handleStart = () => {
    newGame(selectedProfession, playerName || 'Игрок', botCount, botLevel, selectedDream);
    router.replace('/game');
  };

  const prof = PROFESSIONS.find((p) => p.id === selectedProfession)!;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Настройка игры</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollInner}>
        {/* Player name */}
        <SectionTitle title="Ваше имя" />
        <TextInput
          style={styles.input}
          value={playerName}
          onChangeText={setPlayerName}
          placeholder="Введите имя"
          placeholderTextColor="#475569"
          maxLength={20}
        />

        {/* Profession */}
        <SectionTitle title="Профессия" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
          {PROFESSIONS.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[styles.chip, selectedProfession === p.id && styles.chipActive]}
              onPress={() => setSelectedProfession(p.id)}
            >
              <Text style={styles.chipText}>{p.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Profession details */}
        <View style={styles.profDetails}>
          <Text style={styles.profName}>{prof.name}</Text>
          <Text style={styles.profStat}>Зарплата: ${prof.income.salary.toLocaleString('ru')}/мес</Text>
          <Text style={styles.profStat}>Налоги: ${prof.income.taxes.toLocaleString('ru')}</Text>
          <Text style={styles.profStat}>Прочие расходы: ${prof.income.otherExpenses.toLocaleString('ru')}</Text>
          <Text style={styles.profStat}>Начальные сбережения: ${prof.startingSavings.toLocaleString('ru')}</Text>
          <Text style={styles.profStat}>Долги: $
            {(prof.liabilities.homeMortgage + prof.liabilities.studentLoan +
              prof.liabilities.carLoan + prof.liabilities.creditCards +
              prof.liabilities.consumerDebt).toLocaleString('ru')}
          </Text>
        </View>

        {/* Dream */}
        <SectionTitle title="Мечта (цель на Скоростной дорожке)" />
        {DREAMS.map((d) => (
          <TouchableOpacity
            key={d.id}
            style={[styles.dreamItem, selectedDream === d.id && styles.dreamItemActive]}
            onPress={() => setSelectedDream(d.id)}
          >
            <Text style={styles.dreamName}>{d.name}</Text>
            <Text style={styles.dreamDesc}>{d.description}</Text>
            <Text style={styles.dreamCost}>${d.cost.toLocaleString('ru')}</Text>
          </TouchableOpacity>
        ))}

        {/* Bot count */}
        <SectionTitle title="Число ботов (1–5)" />
        <View style={styles.numberRow}>
          {[1, 2, 3, 4, 5].map((n) => (
            <TouchableOpacity
              key={n}
              style={[styles.numberBtn, botCount === n && styles.numberBtnActive]}
              onPress={() => setBotCount(n)}
            >
              <Text style={styles.numberBtnText}>{n}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bot level */}
        <SectionTitle title="Уровень ботов" />
        <View style={styles.numberRow}>
          {(['easy', 'medium', 'hard'] as BotLevel[]).map((level) => (
            <TouchableOpacity
              key={level}
              style={[styles.levelBtn, botLevel === level && styles.levelBtnActive]}
              onPress={() => setBotLevel(level)}
            >
              <Text style={styles.levelBtnText}>
                {level === 'easy' ? 'Лёгкий' : level === 'medium' ? 'Средний' : 'Сложный'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Start */}
        <TouchableOpacity style={styles.startBtn} onPress={handleStart}>
          <Text style={styles.startBtnText}>🎲 Начать игру!</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12, borderBottomWidth: 1, borderBottomColor: '#1e2a3a' },
  backBtn: { padding: 4 },
  backText: { color: '#2d7dff', fontSize: 16 },
  title: { color: '#e2e8f0', fontSize: 20, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollInner: { padding: 16, paddingBottom: 48, gap: 10 },
  sectionTitle: { color: '#f0c040', fontSize: 15, fontWeight: '700', marginTop: 12, marginBottom: 4 },
  input: {
    backgroundColor: '#111827', borderRadius: 10, padding: 14,
    color: '#e2e8f0', fontSize: 16, borderWidth: 1, borderColor: '#1e2a3a',
  },
  chipScroll: { marginBottom: 4 },
  chip: { backgroundColor: '#111827', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, borderWidth: 1, borderColor: '#1e2a3a' },
  chipActive: { backgroundColor: '#1e3a5f', borderColor: '#2d7dff' },
  chipText: { color: '#e2e8f0', fontSize: 14 },
  profDetails: { backgroundColor: '#111827', borderRadius: 12, padding: 14, gap: 4 },
  profName: { color: '#f0c040', fontSize: 17, fontWeight: '700', marginBottom: 4 },
  profStat: { color: '#cbd5e1', fontSize: 13 },
  dreamItem: { backgroundColor: '#111827', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#1e2a3a' },
  dreamItemActive: { borderColor: '#f472b6' },
  dreamName: { color: '#f0c040', fontSize: 16, fontWeight: '700' },
  dreamDesc: { color: '#94a3b8', fontSize: 13, marginTop: 2 },
  dreamCost: { color: '#4ade80', fontSize: 13, marginTop: 4 },
  numberRow: { flexDirection: 'row', gap: 8 },
  numberBtn: { flex: 1, backgroundColor: '#111827', borderRadius: 10, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#1e2a3a' },
  numberBtnActive: { backgroundColor: '#1e3a5f', borderColor: '#2d7dff' },
  numberBtnText: { color: '#e2e8f0', fontSize: 16, fontWeight: '700' },
  levelBtn: { flex: 1, backgroundColor: '#111827', borderRadius: 10, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#1e2a3a' },
  levelBtnActive: { backgroundColor: '#1e3a5f', borderColor: '#f0c040' },
  levelBtnText: { color: '#e2e8f0', fontSize: 14 },
  startBtn: { backgroundColor: '#2d7dff', borderRadius: 14, paddingVertical: 18, alignItems: 'center', marginTop: 20 },
  startBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
