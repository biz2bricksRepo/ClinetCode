# 🚀 Quick Start Guide - Biz2Bricks Flutter App

## Your App is Running! 🎉

The Flutter app is currently running in Chrome at:
**http://localhost:3001**

---

## 📱 What You Should See

### Current Screen: Login Screen

You should see:
1. **Biz2Bricks logo** (blue document icon)
2. **App title** - "Biz2Bricks"
3. **Welcome message** - "Welcome to Biz2Bricks"
4. **Two buttons:**
   - Blue button: "Sign in with Google"
   - Dark button: "Sign in with GitHub"

---

## 🎮 How to Test the App

### Test 1: Login Flow

1. **Click "Sign in with Google" button**
   - You'll see a loading spinner
   - App will navigate to the Home screen
   - Success message appears

2. **You should now see the Home Screen with:**
   - Welcome message: "Welcome, Demo User!"
   - Email: demo@biz2bricks.com
   - 4 feature cards (Upload, Parse, Summarize, Q&A)

### Test 2: Navigation

**Click the bottom navigation tabs:**

1. **🏠 Home tab** - Main dashboard with feature cards
2. **📁 Documents tab** - Shows "No documents yet" message
3. **🔍 Search tab** - Search interface (coming soon)
4. **👤 Profile tab** - User profile with settings

### Test 3: Feature Cards

On the Home tab, click any feature card:
- Upload Documents
- Parse Files
- Summarize
- Q&A

Each will show "Coming soon!" message.

### Test 4: Sign Out

1. Click the **logout icon** (🚪) in the top-right of AppBar
2. You'll return to the Login screen

---

## 🔥 Hot Reload Demo

Want to see Flutter's magic? Try this:

### Change 1: Update App Title
1. Open `lib/screens/auth/login_screen.dart` in your editor
2. Find line ~160 (in `_buildHeader()` method):
   ```dart
   const Text(
     'Biz2Bricks',  // ← Change this
   ```
3. Change to:
   ```dart
   const Text(
     'Biz2Bricks Mobile',  // ← New text
   ```
4. **Save the file**
5. In the terminal running Flutter, press **`R`** (capital R) for hot restart
6. **See the change instantly!** 🎉

### Change 2: Update Button Color
1. Open `lib/screens/auth/login_screen.dart`
2. Find line ~233 (Google button style):
   ```dart
   backgroundColor: const Color(AppColors.primaryBlue),
   ```
3. Change to:
   ```dart
   backgroundColor: Colors.green,  // ← Make it green!
   ```
4. **Save**
5. Press **`r`** (lowercase r) for hot reload
6. **Google button is now green!** 🎨

### Change 3: Add Your Name
1. Open `lib/services/auth_service.dart`
2. Find line ~44:
   ```dart
   _userName = 'Demo User';
   ```
3. Change to your name:
   ```dart
   _userName = 'Rahul';  // ← Your name
   ```
4. **Save** and press **`R`**
5. Log in again, and you'll see "Welcome, Rahul!"

---

## 🎯 Where is Each Screen?

| What You See | File Location |
|--------------|---------------|
| Login Screen | `lib/screens/auth/login_screen.dart` |
| Home Screen | `lib/screens/home/home_screen.dart` |
| App Theme & Routes | `lib/main.dart` |
| Authentication | `lib/services/auth_service.dart` |
| Colors & URLs | `lib/utils/constants.dart` |

---

## 🛠️ Terminal Commands

While the app is running, you can press:

| Key | Action |
|-----|--------|
| `r` | **Hot reload** - Fast refresh, keeps state |
| `R` | **Hot restart** - Full restart, resets state |
| `q` | **Quit** - Stop the app |
| `h` | **Help** - Show all commands |
| `c` | **Clear** - Clear terminal |

---

## 📸 Visual Guide

### Login Screen Components:

```
┌─────────────────────────────────┐
│         ┌───────┐               │
│         │  📄   │  ← App Icon   │
│         └───────┘               │
│                                 │
│      Biz2Bricks  ← App Title    │
│  Document Processing & Insights │
│                                 │
│  Welcome to Biz2Bricks          │ ← Welcome Text
│  Sign in to continue            │
│                                 │
│  ┌──────────────────────────┐  │
│  │  Sign in with Google     │  │ ← Blue Button
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │  Sign in with GitHub     │  │ ← Dark Button
│  └──────────────────────────┘  │
│                                 │
│  [Note: Demo auth for web]      │
│                                 │
└─────────────────────────────────┘
```

### Home Screen After Login:

```
┌─────────────────────────────────┐
│ Biz2Bricks              [Logout]│ ← AppBar
├─────────────────────────────────┤
│                                 │
│  Welcome, Demo User!            │ ← User Greeting
│  demo@biz2bricks.com            │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📤  Upload Documents     │ →│ ← Feature Cards
│  └─────────────────────────┘   │ (Click to use)
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📝  Parse Files          │ →│
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📋  Summarize            │ →│
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 💬  Q&A                  │ →│
│  └─────────────────────────┘   │
│                                 │
├─────────────────────────────────┤
│  [🏠]  [📁]  [🔍]  [👤]        │ ← Bottom Nav
└─────────────────────────────────┘
```

---

## ✨ Cool Things to Try

### 1. Explore Navigation
- Click all 4 bottom tabs
- Notice how the content changes
- State is preserved (try going back and forth)

### 2. Test Sign Out Flow
- Click logout
- Notice it goes back to login
- Click Google sign-in again
- You're back at home!

### 3. Profile Tab
- Go to Profile tab (👤)
- See your user info
- Try clicking Settings, Help, About
- Each shows "Coming soon"

### 4. Documents Tab
- Click Documents tab (📁)
- See empty state with icon
- This is where your document list will appear

---

## 🎨 Customization Ideas

Try customizing these:

### Change Theme Color:
**File:** `lib/utils/constants.dart`
```dart
class AppColors {
  static const int primaryBlue = 0xFF2563EB;  // ← Change this
  // Try: 0xFF10B981 (green), 0xFFEF4444 (red), 0xFF8B5CF6 (purple)
}
```

### Change Welcome Message:
**File:** `lib/screens/home/home_screen.dart` (line ~107)
```dart
Text(
  'Welcome, ${user['name'] ?? 'User'}!',  // ← Customize this
)
```

### Add More Feature Cards:
**File:** `lib/screens/home/home_screen.dart` (after line ~135)
```dart
_buildFeatureCard(
  'Excel Insights',              // Title
  'Analyze Excel data',          // Description
  Icons.table_chart,             // Icon
  Colors.blue,                   // Color
  () => _showComingSoon('Excel'), // Action
),
```

---

## 🐛 Troubleshooting

### App not showing in browser?
- Check http://localhost:3001
- Terminal should show "A Dart VM Service on Chrome is available"

### Changes not appearing?
- Make sure you **saved the file**
- Press `R` (capital R) in terminal for hot restart
- Check terminal for errors

### Want to restart completely?
```bash
# In terminal, press 'q' to quit
# Then run again:
cd /Users/RahulMacPro/Documents/Rahul/Biz2Bricks_VikasGIT/Biz2BricksClient/Biz2BricksFlutterApp/biz2bricks_mobile
flutter run -d chrome
```

---

## 📚 Learn More

- **[CODE_OVERVIEW.md](CODE_OVERVIEW.md)** - Detailed code explanation
- **[SETUP.md](../SETUP.md)** - Full setup guide
- **[API_INTEGRATION.md](../API_INTEGRATION.md)** - Backend integration

---

## 🎯 Next Steps

Ready to add more features? You can:

1. **Add API Integration** - Connect to your backend
2. **Build Document List** - Show real documents
3. **Add File Upload** - Upload files from device
4. **Implement Search** - Search across documents

Let me know what you'd like to build next! 🚀
