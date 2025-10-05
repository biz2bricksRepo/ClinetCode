# Biz2Bricks Flutter Mobile App

A native mobile application for iOS and Android that consumes the same backend APIs as the Biz2Bricks React/Next.js web application.

## Project Status

📋 **Setup Phase** - Flutter project needs to be initialized

## Quick Start

### Prerequisites

1. **Install Flutter SDK**
   ```bash
   brew install --cask flutter
   ```

2. **Verify Installation**
   ```bash
   flutter doctor
   ```

3. **Create the Flutter Project**
   ```bash
   cd /Users/RahulMacPro/Documents/Rahul/Biz2Bricks_VikasGIT/Biz2BricksClient/Biz2BricksFlutterApp
   flutter create biz2bricks_mobile
   cd biz2bricks_mobile
   ```

### After Creating the Project

1. Follow the setup instructions in [SETUP.md](./SETUP.md)
2. Review API integration details in [API_INTEGRATION.md](./API_INTEGRATION.md)
3. Add required dependencies to `pubspec.yaml`
4. Run `flutter pub get`

## Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup guide including prerequisites, project structure, and configuration
- **[API_INTEGRATION.md](./API_INTEGRATION.md)** - Detailed API service implementation and usage examples

## Features to Implement

Based on the existing React/Next.js application:

### Authentication
- [x] Google OAuth integration
- [ ] GitHub OAuth integration
- [ ] Secure token storage

### Document Management
- [ ] Upload documents (PDF, Excel, etc.)
- [ ] List and browse documents
- [ ] Parse document content
- [ ] Summarize documents
- [ ] Delete documents

### Search & Q&A
- [ ] Hybrid search functionality
- [ ] Generate questions from documents
- [ ] Free-text Q&A on documents
- [ ] FAQ generation

### Excel Features
- [ ] Excel file mapping
- [ ] Excel data insights
- [ ] Excel export functionality

### Agent Management
- [ ] Create and manage agents
- [ ] Agent file explorer
- [ ] Firestore integration

## Backend APIs

The mobile app will connect to:

1. **Document Processing API**
   - Production: `https://document-processing-service-38231329931.us-central1.run.app`
   - Handles file upload, parsing, summarization, and search

2. **Agent/Firestore API**
   - Development: `http://127.0.0.1:5000`
   - Handles agent management and Firestore operations

## Technology Stack

- **Framework**: Flutter (Dart)
- **State Management**: Provider / Riverpod
- **HTTP Client**: Dio
- **Authentication**: Google Sign-In, Flutter Secure Storage
- **File Handling**: File Picker, Path Provider
- **Excel Processing**: Excel package

## Project Structure (After Creation)

```
biz2bricks_mobile/
├── lib/
│   ├── main.dart
│   ├── models/          # Data models
│   ├── services/        # API services
│   ├── providers/       # State management
│   ├── screens/         # UI screens
│   ├── widgets/         # Reusable widgets
│   └── utils/           # Constants and utilities
├── android/             # Android-specific code
├── ios/                 # iOS-specific code
└── pubspec.yaml         # Dependencies
```

## Next Steps

1. ✅ Review existing React/Next.js codebase
2. ✅ Document backend API endpoints
3. ✅ Create Flutter project folder and documentation
4. ⏳ Install Flutter SDK on your machine
5. ⏳ Initialize Flutter project
6. ⏳ Implement API services
7. ⏳ Build authentication flow
8. ⏳ Create UI screens
9. ⏳ Test on iOS and Android

## Development Notes

### Local Development
When testing on physical devices, replace `localhost` with your machine's IP address:
```dart
// Instead of: http://127.0.0.1:5000
// Use: http://192.168.1.x:5000
```

### Production Deployment
- Configure OAuth credentials for mobile apps in Google Console
- Update API endpoints to production URLs
- Enable ProGuard for Android
- Configure code signing for iOS

## Support

For Flutter-specific questions:
- [Flutter Documentation](https://docs.flutter.dev)
- [Flutter Cookbook](https://docs.flutter.dev/cookbook)

For API-related questions, refer to the existing React/Next.js implementation.

## License

[Add your license here]
