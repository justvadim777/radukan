# МОНЕТКАЧ — Godot 4 Idle Clicker

Простой idle-кликер: тапаешь монету, зарабатываешь монеты, покупаешь апгрейды.

## Как собрать APK

### Требования
- [Godot 4.3+](https://godotengine.org/download/) (стандартная версия, не .NET)
- [Android SDK](https://developer.android.com/studio) — или просто Android Studio
- JDK 17+

### Шаги

1. **Настрой Android в Godot** (один раз):
   - Открой Godot → Editor → Editor Settings → Export → Android
   - Укажи путь к Android SDK (`~/Library/Android/sdk` на Mac или `C:\Users\...\AppData\Local\Android\Sdk` на Windows)
   - Godot сам создаст debug keystore

2. **Открой проект:**
   ```
   Godot → Import → выбери эту папку → Import & Edit
   ```

3. **Установи Android Export Template:**
   - Editor → Manage Export Templates → Download (выбери свою версию Godot)

4. **Экспортируй APK:**
   - Project → Export → Android → Export Project
   - Оставь галку "Export With Debug"
   - Нажми **Export Project** → сохрани `МОНЕТКАЧ.apk`

5. **Установи на телефон:**
   - Перекинь APK на телефон (Telegram себе, Google Drive, кабель)
   - На Android: Настройки → Безопасность → Разрешить установку из неизвестных источников
   - Тапни по файлу → Установить

## Структура
```
scenes/Main.tscn    — главная сцена
scripts/Main.gd     — вся логика игры
project.godot       — конфиг проекта
export_presets.cfg  — настройки экспорта Android
```
