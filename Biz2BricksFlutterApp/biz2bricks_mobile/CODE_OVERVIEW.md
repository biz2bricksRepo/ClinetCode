# Biz2Bricks Mobile - Code Overview

## ✅ What's Been Created

### 📂 Project Structure

```
lib/
├── main.dart                          # App entry point ✅
├── screens/
│   ├── auth/
│   │   └── login_screen.dart         # Login screen with Google/GitHub auth ✅
│   └── home/
│       └── home_screen.dart          # Home screen with navigation ✅
├── services/
│   └── auth_service.dart             # Authentication service ✅
└── utils/
    └── constants.dart                # API URLs and app constants ✅
```

---

## 📝 Files Explained

### 1. **[lib/main.dart](lib/main.dart)** - App Entry Point

**What it does:**
- Initializes the Biz2Bricks mobile app
- Sets up Material Design theme
- Configures navigation routes
- Defines app-wide styling

**Key Features:**
```dart
void main() {
  runApp(const Biz2BricksApp());  // Starts the app
}
```

**Theme Configuration:**
- Primary color: Blue (#2563EB) - matches your web app
- Material Design 3 components
- Custom AppBar, Card, and Input styling

**Routes:**
- `/` → Login Screen (initial route)
- `/home` → Home Screen (after login)

---

### 2. **[lib/screens/auth/login_screen.dart](lib/screens/auth/login_screen.dart)** - Login Screen

**What it does:**
- Provides Google and GitHub sign-in buttons
- Mirrors your React/Next.js [sign-in.tsx](../../../app/UIComponents/UILoginComponents/sign-in.tsx)
- Handles authentication flow
- Shows loading state during sign-in

**UI Components:**
1. **App Logo** - Biz2Bricks branding with icon
2. **Welcome Text** - "Welcome to Biz2Bricks"
3. **Sign-in Buttons:**
   - Google (Blue button)
   - GitHub (Dark gray button)
4. **Loading Indicator** - Shows while authenticating

**Code Structure:**
```dart
class LoginScreen extends StatefulWidget {
  // Manages login state (loading, errors)
}

class _LoginScreenState extends State<LoginScreen> {
  final AuthService _authService = AuthService();
  bool _isLoading = false;

  // Handle Google Sign-In
  Future<void> _handleGoogleSignIn() async {
    // 1. Show loading
    // 2. Call auth service
    // 3. Navigate to home on success
    // 4. Show error on failure
  }
}
```

**Compared to React/Next.js:**

| React/Next.js | Flutter Equivalent |
|---------------|-------------------|
| `<button onClick={...}>` | `ElevatedButton(onPressed: ...)` |
| `await handleSignIn("google")` | `await _authService.signInWithGoogle()` |
| `className="..."` | `style: ElevatedButton.styleFrom(...)` |
| `useState(loading)` | `setState(() => _isLoading = true)` |

---

### 3. **[lib/screens/home/home_screen.dart](lib/screens/home/home_screen.dart)** - Home Screen

**What it does:**
- Main screen after successful login
- Bottom navigation with 4 tabs
- Feature cards for document operations
- User profile section

**Tabs:**
1. **Home** - Welcome message + feature cards
   - Upload Documents
   - Parse Files
   - Summarize
   - Q&A

2. **Documents** - Document list (coming soon)
3. **Search** - Search interface (coming soon)
4. **Profile** - User info and settings

**Key Features:**
```dart
class HomeScreen extends StatefulWidget {
  int _selectedIndex = 0;  // Current tab

  void _onItemTapped(int index) {
    setState(() => _selectedIndex = index);  // Switch tabs
  }
}
```

**UI Components:**
- `AppBar` - Shows "Biz2Bricks" title + sign out button
- `BottomNavigationBar` - 4-tab navigation
- `Card` widgets - Feature cards with icons
- `CircleAvatar` - User profile picture

---

### 4. **[lib/services/auth_service.dart](lib/services/auth_service.dart)** - Authentication Service

**What it does:**
- Handles Google and GitHub OAuth
- Stores user session data
- Provides sign-in/sign-out methods
- Singleton pattern (one instance app-wide)

**Methods:**

```dart
class AuthService {
  // Sign in with Google
  Future<bool> signInWithGoogle() async {
    // For web: Simulated for demo (needs backend OAuth)
    // For mobile: Will use google_sign_in package
  }

  // Sign in with GitHub
  Future<bool> signInWithGitHub() async {
    // Similar to Google sign-in
  }

  // Sign out
  Future<void> signOut() async {
    // Clear user data
  }

  // Get current user
  Map<String, String?> getCurrentUser() {
    return {'email': _userEmail, 'name': _userName};
  }
}
```

**Current Implementation:**
- **Web (Chrome)**: Simulated authentication for demo
- **Mobile**: Requires `google_sign_in` package (add later)

**To use in production:**
1. Configure OAuth in Google Cloud Console
2. Add `google_sign_in` package to pubspec.yaml
3. Update `signInWithGoogle()` with actual OAuth flow

---

### 5. **[lib/utils/constants.dart](lib/utils/constants.dart)** - Constants

**What it does:**
- Stores API endpoints
- Defines app colors
- Route names

**API Endpoints:**
```dart
class ApiConstants {
  // Same as your React/Next.js app
  static const String agentBaseUrl = 'http://127.0.0.1:5000';
  static const String documentBaseUrl =
    'https://document-processing-service-38231329931.us-central1.run.app';
}
```

**Colors:**
```dart
class AppColors {
  static const int primaryBlue = 0xFF2563EB;  // #2563EB
  static const int darkGray = 0xFF1F2937;     // #1F2937
}
```

**Routes:**
```dart
class AppRoutes {
  static const String login = '/';
  static const String home = '/home';
}
```

---

## 🎨 How It Looks

### Login Screen
```
┌─────────────────────────┐
│   🗎 [Biz2Bricks Logo]  │
│                         │
│   Biz2Bricks            │
│   Document Processing   │
│                         │
│   Welcome to Biz2Bricks │
│   Sign in to continue   │
│                         │
│   [Sign in with Google] │ ← Blue button
│   [Sign in with GitHub] │ ← Dark button
│                         │
└─────────────────────────┘
```

### Home Screen
```
┌─────────────────────────┐
│ Biz2Bricks        [🚪]  │ ← AppBar with logout
├─────────────────────────┤
│ Welcome, Demo User!     │
│ demo@biz2bricks.com     │
│                         │
│ ┌─────────────────────┐ │
│ │ 📤 Upload Documents │ │ ← Feature cards
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 📝 Parse Files      │ │
│ └─────────────────────┘ │
├─────────────────────────┤
│ [🏠] [📁] [🔍] [👤]   │ ← Bottom navigation
└─────────────────────────┘
```

---

## 🔄 User Flow

```
1. App starts → Shows Login Screen
                    ↓
2. User clicks "Sign in with Google"
                    ↓
3. AuthService authenticates (simulated for web demo)
                    ↓
4. Navigate to Home Screen
                    ↓
5. User sees welcome message + feature cards
                    ↓
6. User can navigate between tabs:
   - Home (feature overview)
   - Documents (list)
   - Search (queries)
   - Profile (user info)
                    ↓
7. User clicks logout → Back to Login Screen
```

---

## ⚡ Flutter Features Used

### 1. **StatefulWidget vs StatelessWidget**
- `LoginScreen`: Stateful (has loading state)
- `HomeScreen`: Stateful (has selected tab index)
- `Biz2BricksApp`: Stateless (never changes)

### 2. **setState()**
```dart
void _incrementCounter() {
  setState(() {
    _counter++;  // Tells Flutter to rebuild UI
  });
}
```

### 3. **Navigation**
```dart
// Navigate to home screen
Navigator.of(context).pushReplacementNamed(AppRoutes.home);

// Go back
Navigator.of(context).pop();
```

### 4. **Material Design Components**
- `Scaffold` - Basic page structure
- `AppBar` - Top bar
- `ElevatedButton` - Raised buttons
- `Card` - Material cards
- `BottomNavigationBar` - Bottom tabs

### 5. **Async/Await**
```dart
Future<void> _handleSignIn() async {
  final success = await _authService.signInWithGoogle();
  if (success) {
    // Navigate...
  }
}
```

---

## 🚀 How to Run

### Currently Running (Web)
The app is running in Chrome at **http://localhost:3001**

### To See Your Changes:
1. Save any file in `lib/`
2. In the terminal running Flutter, press:
   - `r` - Hot reload (fast, keeps state)
   - `R` - Hot restart (full restart)

### Commands:
```bash
# Hot reload
Press 'r' in terminal

# Hot restart (to see login screen changes)
Press 'R' in terminal

# Quit app
Press 'q' in terminal
```

---

## 🎯 What's Different from React/Next.js

| Feature | React/Next.js | Flutter |
|---------|---------------|---------|
| **Language** | TypeScript/JavaScript | Dart |
| **Components** | Functions/JSX | Widgets/Classes |
| **State** | `useState()` | `setState()` |
| **Styling** | CSS/Tailwind classes | Dart style objects |
| **Navigation** | Next.js router | Navigator + routes |
| **API Calls** | `fetch()` | `http` package (to add) |
| **Hot Reload** | Fast Refresh | Hot reload (`r` key) |

---

## ✅ Current Status

**Completed:**
- ✅ Login screen with Google/GitHub buttons
- ✅ Home screen with 4-tab navigation
- ✅ Authentication service (simulated for web demo)
- ✅ App theming and styling
- ✅ Route configuration

**To Do (Next Steps):**
- ⏳ Add API service for document operations
- ⏳ Implement document list screen
- ⏳ Add file upload functionality
- ⏳ Connect to real backend APIs
- ⏳ Implement actual OAuth (not simulated)

---

## 🔧 How to Test

### Test Login Flow:
1. App should show login screen
2. Click "Sign in with Google"
3. Should navigate to home screen
4. See welcome message with your email

### Test Navigation:
1. Click bottom navigation tabs
2. Each tab shows different content
3. Click logout to return to login

### Test Hot Reload:
1. Open `lib/screens/auth/login_screen.dart`
2. Change line with "Welcome to Biz2Bricks" to something else
3. Save file
4. Press `R` in terminal
5. See changes immediately in browser!

---

## 📚 Next Steps

1. **Add Dependencies** to `pubspec.yaml`:
   ```yaml
   dependencies:
     http: ^1.2.0          # For API calls
     provider: ^6.1.1      # State management
   ```

2. **Create API Services**:
   - Document upload service
   - File listing service
   - Search service

3. **Build Document Screens**:
   - Document list with cards
   - Upload screen with file picker
   - Document detail view

4. **Connect to Backend**:
   - Use the API endpoints from `constants.dart`
   - Test with your existing backend

Would you like me to continue with any of these next steps?
