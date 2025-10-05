# Biz2Bricks Flutter Mobile App - Setup Guide

## Overview
This Flutter mobile application is designed to consume the same backend APIs as the React/Next.js web application. It provides native mobile experience for iOS and Android platforms.

## Backend API Details

### Base URLs
- **Development**: `http://127.0.0.1:5000` (Agent APIs)
- **Production**: `https://document-processing-service-38231329931.us-central1.run.app` (Document Processing)

### Authentication
- **Provider**: NextAuth with Google & GitHub OAuth
- **Method**: OAuth 2.0
- The mobile app will need to implement OAuth flow for Google and GitHub

### Key API Endpoints

#### Document Processing APIs
1. **Upload File**
   - `POST /uploadfile/`
   - Content-Type: multipart/form-data
   - Body: file (FormData)

2. **List Files**
   - `GET /listfiles/{directory}`
   - Returns: JSON array of file names

3. **Parse File**
   - `GET /parsefile/{fileName}`
   - Returns: Parsed file content

4. **Save and Ingest Content**
   - `POST /saveandingst/{fileName}`
   - Body: `{ "content": "string" }`

5. **Summarize Content**
   - `GET /summarizecontent/{fileName}`
   - Returns: Summarized content

6. **Delete File**
   - `DELETE /deletefile/{directory}/{fileName}`

7. **Generate Questions**
   - `GET /generatequestions/{fileName}?noOfQuestions={number}`
   - Returns: Generated questions from document

8. **Hybrid Search**
   - `POST /hybridsearch/`
   - Body: `{ "query": "string", "source_document": "string" }`

#### Agent/Firestore APIs
1. **Insert Document**
   - `POST http://127.0.0.1:5000/firestore/insert`
   - Body: `{ "document": {} }`

2. **Select Document**
   - `POST http://127.0.0.1:5000/firestore/select`
   - Body: `{ "Org_Id": "string", "Agent_Id": "string" }`

3. **Populate Excel**
   - `POST http://127.0.0.1:5000/populate_excel`
   - Body: `{ "Org_Id": "string", "Agent_Id": "string", "file_name": "string" }`

4. **Get Agents List**
   - `POST http://127.0.0.1:5000/firestore/getAgentsList`
   - Body: `{ "Org_Id": "string" }`

## Prerequisites

### 1. Install Flutter SDK
```bash
# macOS (using Homebrew)
brew install --cask flutter

# Or download from: https://docs.flutter.dev/get-started/install
```

### 2. Install Xcode (for iOS development)
```bash
# Install from Mac App Store
# Then install Xcode Command Line Tools
xcode-select --install
```

### 3. Install Android Studio (for Android development)
- Download from: https://developer.android.com/studio
- Install Android SDK and configure emulator

### 4. Verify Flutter Installation
```bash
flutter doctor
```

## Project Setup

### 1. Create Flutter Project
```bash
cd /Users/RahulMacPro/Documents/Rahul/Biz2Bricks_VikasGIT/Biz2BricksClient/Biz2BricksFlutterApp
flutter create biz2bricks_mobile
cd biz2bricks_mobile
```

### 2. Required Dependencies
Add these to `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter

  # HTTP & Networking
  http: ^1.2.0
  dio: ^5.4.0

  # State Management
  provider: ^6.1.1
  riverpod: ^2.5.1

  # Authentication
  google_sign_in: ^6.2.1
  flutter_secure_storage: ^9.0.0

  # File Handling
  file_picker: ^6.1.1
  path_provider: ^2.1.2

  # UI Components
  flutter_svg: ^2.0.10
  cached_network_image: ^3.3.1

  # Excel/Documents
  excel: ^4.0.3

  # Utilities
  intl: ^0.19.0
  equatable: ^2.0.5
```

### 3. Install Dependencies
```bash
flutter pub get
```

## Project Structure

```
biz2bricks_mobile/
├── lib/
│   ├── main.dart
│   ├── models/
│   │   ├── user.dart
│   │   ├── document.dart
│   │   └── agent.dart
│   ├── services/
│   │   ├── api_service.dart
│   │   ├── document_service.dart
│   │   ├── agent_service.dart
│   │   └── auth_service.dart
│   ├── providers/
│   │   ├── auth_provider.dart
│   │   └── document_provider.dart
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── login_screen.dart
│   │   │   └── register_screen.dart
│   │   ├── documents/
│   │   │   ├── upload_screen.dart
│   │   │   ├── list_screen.dart
│   │   │   ├── parse_screen.dart
│   │   │   └── summarize_screen.dart
│   │   └── home_screen.dart
│   ├── widgets/
│   │   └── common/
│   └── utils/
│       ├── constants.dart
│       └── api_endpoints.dart
├── android/
├── ios/
└── pubspec.yaml
```

## Configuration

### 1. API Configuration
Create `lib/utils/constants.dart`:

```dart
class ApiConstants {
  static const String agentBaseUrl = 'http://127.0.0.1:5000';
  static const String documentBaseUrl = 'https://document-processing-service-38231329931.us-central1.run.app';

  // For production, update to actual backend URLs
  // static const String agentBaseUrl = 'YOUR_PRODUCTION_URL';
}
```

### 2. Google Sign-In Setup

#### iOS Configuration
1. Add to `ios/Runner/Info.plist`:
```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>com.googleusercontent.apps.YOUR-CLIENT-ID</string>
    </array>
  </dict>
</array>
```

#### Android Configuration
1. Add to `android/app/build.gradle`:
```gradle
android {
    defaultConfig {
        minSdkVersion 21
    }
}
```

2. Download `google-services.json` from Firebase Console and place in `android/app/`

## Running the App

### iOS Simulator
```bash
flutter run -d ios
```

### Android Emulator
```bash
flutter run -d android
```

### Physical Device
```bash
flutter devices  # List available devices
flutter run -d <device-id>
```

## Next Steps

1. Install Flutter SDK
2. Run `flutter create` command
3. Copy the code templates from this guide
4. Configure OAuth credentials for Google/GitHub
5. Update API endpoints for production
6. Test on iOS and Android devices

## Features to Implement

Based on the React/Next.js app, the Flutter app should include:

- [ ] Google & GitHub OAuth authentication
- [ ] Document upload functionality
- [ ] File explorer with list/grid view
- [ ] Document parsing and preview
- [ ] Document summarization
- [ ] Q&A on documents
- [ ] Excel mapping and export
- [ ] Search functionality (hybrid search)
- [ ] Agent management (Firestore integration)
- [ ] User profile management

## Notes

- The current Next.js app uses NextAuth for authentication, which is web-specific
- The Flutter app will need to implement native OAuth flows
- Consider using Firebase Authentication for easier mobile OAuth integration
- Ensure CORS is configured on backend APIs to allow mobile app requests
- For local development, use actual device IP instead of localhost (e.g., `http://192.168.1.x:5000`)
