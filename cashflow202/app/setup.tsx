import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SetupScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Настройка игры</Text>
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        <Text style={styles.placeholder}>Настройки игры (этап 4)</Text>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => router.replace('/game')}
        >
          <Text style={styles.startBtnText}>Начать игру</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  backBtn: { padding: 8 },
  backText: { color: '#2d7dff', fontSize: 16 },
  title: { color: '#e2e8f0', fontSize: 20, fontWeight: '700' },
  content: { flex: 1 },
  contentInner: { padding: 24 },
  placeholder: { color: '#94a3b8', fontSize: 16, marginBottom: 32 },
  startBtn: {
    backgroundColor: '#2d7dff', borderRadius: 14, paddingVertical: 18,
    alignItems: 'center',
  },
  startBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
