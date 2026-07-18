import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GameScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Меню</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Игровое поле</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.placeholder}>Игровое поле (этап 4)</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  backBtn: { padding: 8 },
  backText: { color: '#2d7dff', fontSize: 16 },
  title: { color: '#e2e8f0', fontSize: 20, fontWeight: '700' },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholder: { color: '#94a3b8', fontSize: 16 },
});
