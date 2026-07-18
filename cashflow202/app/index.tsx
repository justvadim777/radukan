import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainMenu() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ДЕНЕЖНЫЙ ПОТОК</Text>
        <Text style={styles.subtitle}>202</Text>
        <Text style={styles.tagline}>Путь к финансовой свободе</Text>
      </View>

      <View style={styles.menu}>
        <MenuButton
          label="🎲 Новая игра"
          onPress={() => router.push('/setup')}
          primary
        />
        <MenuButton
          label="▶ Продолжить"
          onPress={() => router.push('/game')}
        />
        <MenuButton
          label="📖 Правила"
          onPress={() => router.push('/rules')}
        />
        <MenuButton
          label="⚙ Настройки"
          onPress={() => router.push('/settings')}
        />
      </View>

      <Text style={styles.version}>v1.0.0 · Cashflow 202</Text>
    </SafeAreaView>
  );
}

function MenuButton({
  label,
  onPress,
  primary = false,
}: {
  label: string;
  onPress: () => void;
  primary?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.button, primary && styles.buttonPrimary]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={[styles.buttonText, primary && styles.buttonTextPrimary]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f1e',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#f0c040',
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 80,
    fontWeight: '900',
    color: '#2d7dff',
    lineHeight: 88,
    marginTop: -8,
  },
  tagline: {
    fontSize: 14,
    color: '#94a3b8',
    letterSpacing: 2,
    marginTop: 8,
  },
  menu: {
    width: '100%',
    paddingHorizontal: 32,
    gap: 12,
  },
  button: {
    backgroundColor: '#1e2a3a',
    borderWidth: 1,
    borderColor: '#2d4060',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#2d7dff',
    borderColor: '#2d7dff',
  },
  buttonText: {
    color: '#e2e8f0',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonTextPrimary: {
    color: '#ffffff',
    fontWeight: '700',
  },
  version: {
    color: '#475569',
    fontSize: 12,
  },
});
