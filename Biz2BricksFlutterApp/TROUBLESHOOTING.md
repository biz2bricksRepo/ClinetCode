# Flutter Development Environment Setup - Troubleshooting

## Current Status

✅ Flutter SDK installed (v3.35.5)
✅ Chrome (web development ready)
✅ VS Code installed
❌ Xcode (required for iOS)
❌ Android SDK (required for Android)
❌ CocoaPods (required for iOS)

## Quick Solutions

### Option 1: Run in Chrome Browser (Works Now!)

The fastest way to test your Flutter app is in the browser:

```bash
cd /Users/RahulMacPro/Documents/Rahul/Biz2Bricks_VikasGIT/Biz2BricksClient/Biz2BricksFlutterApp/biz2bricks_mobile
flutter run -d chrome
```

**Note**: Some mobile-specific features won't work in browser (camera, file system, etc.)

---

## Option 2: Setup for iOS Development

### Step 1: Install Xcode (Required)

1. **Download Xcode from Mac App Store** (Free, ~12GB, takes 30-60 minutes)
   - Open Mac App Store
   - Search for "Xcode"
   - Click "Get" or "Install"

2. **After Installation, Configure Xcode**:
   ```bash
   # Point to Xcode installation
   sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer

   # Accept license
   sudo xcodebuild -license accept

   # Install required components
   sudo xcodebuild -runFirstLaunch
   ```

### Step 2: Install CocoaPods

```bash
# Install CocoaPods (iOS dependency manager)
sudo gem install cocoapods

# Setup CocoaPods
pod setup
```

### Step 3: Verify iOS Setup

```bash
flutter doctor
```

You should see ✅ next to "Xcode - develop for iOS and macOS"

### Step 4: Run on iOS Simulator

```bash
# Open iOS Simulator
open -a Simulator

# Run Flutter app
flutter run -d "iPhone 15"
```

---

## Option 3: Setup for Android Development

### Step 1: Install Android Studio

1. **Download Android Studio**: https://developer.android.com/studio
2. **Install** the .dmg file
3. **Open Android Studio** and complete the setup wizard
   - It will automatically download Android SDK
   - Install recommended components

### Step 2: Configure Android SDK

During Android Studio first launch:
- Accept all licenses
- Install Android SDK Platform
- Install Android SDK Build-Tools
- Install Android Emulator

Or manually:
```bash
# Accept licenses
flutter doctor --android-licenses
```

### Step 3: Create Android Virtual Device (AVD)

1. Open Android Studio
2. Click "More Actions" → "Virtual Device Manager"
3. Click "Create Device"
4. Select a device (e.g., "Pixel 5")
5. Download a system image (e.g., "Android 13")
6. Click "Finish"

### Step 4: Run on Android Emulator

```bash
# List available devices
flutter devices

# Run on Android emulator
flutter run -d android
```

---

## Option 4: Quick Setup - Web Only (Recommended for Now)

If you just want to start developing quickly:

```bash
# 1. Navigate to project
cd /Users/RahulMacPro/Documents/Rahul/Biz2Bricks_VikasGIT/Biz2BricksClient/Biz2BricksFlutterApp/biz2bricks_mobile

# 2. Run in Chrome
flutter run -d chrome --web-port 3001

# 3. Enable hot reload - just save files to see changes!
```

**Advantages**:
- Works immediately, no additional setup
- Fast hot reload
- Good for UI development and testing API integration

**Limitations**:
- Some mobile-specific features won't work
- Different rendering than native mobile

---

## Common Errors and Solutions

### Error: "xcrun: error: unable to find utility 'xcodebuild'"

**Solution**: Install full Xcode from Mac App Store (not just Command Line Tools)

### Error: "Unable to locate Android SDK"

**Solution**: Install Android Studio from https://developer.android.com/studio

### Error: "CocoaPods not installed"

**Solution**:
```bash
sudo gem install cocoapods
pod setup
```

### Error: "cmdline-tools component is missing"

**Solution**:
1. Open Android Studio
2. Go to Settings → Appearance & Behavior → System Settings → Android SDK
3. Go to SDK Tools tab
4. Check "Android SDK Command-line Tools"
5. Click Apply

---

## Recommended Development Path

For fastest results, follow this order:

1. **Week 1**: Develop in Chrome browser
   - Build UI components
   - Integrate API services
   - Test business logic

2. **Week 2**: Setup one mobile platform
   - Choose iOS (if you have Mac App Store access)
   - OR Android (if you prefer/need Android first)

3. **Week 3**: Setup second platform
   - Complete cross-platform testing

---

## Running the App - Quick Reference

```bash
# Web (Chrome)
flutter run -d chrome

# iOS Simulator
flutter run -d "iPhone 15"

# Android Emulator
flutter run -d emulator-5554

# List all available devices
flutter devices

# Hot reload (press 'r' in terminal while app is running)
# Hot restart (press 'R' in terminal)
# Quit (press 'q' in terminal)
```

---

## System Requirements

### For iOS Development:
- macOS only
- Xcode 15+ (~12GB disk space)
- macOS 11+ (Big Sur or later)
- 8GB RAM minimum, 16GB recommended

### For Android Development:
- Works on macOS, Windows, Linux
- Android Studio (~4GB disk space)
- 8GB RAM minimum, 16GB recommended

### For Web Development:
- Chrome browser
- Works immediately with Flutter installation

---

## Verify Your Setup

Run this command to check everything:

```bash
flutter doctor -v
```

✅ Green checkmarks = Ready to use
❌ Red X = Needs setup
⚠️  Yellow warning = Optional, but recommended

---

## Need Help?

1. Check Flutter documentation: https://docs.flutter.dev
2. Run `flutter doctor -v` for detailed diagnostics
3. Check specific error messages in terminal

## Current Recommendation

Since you're getting the Xcode error, I recommend:

**Option A** (Fast): Use Chrome for development right now
```bash
cd /Users/RahulMacPro/Documents/Rahul/Biz2Bricks_VikasGIT/Biz2BricksClient/Biz2BricksFlutterApp/biz2bricks_mobile
flutter run -d chrome
```

**Option B** (Mobile): Install Xcode from Mac App Store (~1 hour), then run on iOS Simulator

Choose Option A to start coding immediately!
