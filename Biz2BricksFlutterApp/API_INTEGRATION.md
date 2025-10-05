# API Integration Guide for Flutter App

## Overview
This document provides detailed code examples for integrating the Flutter mobile app with the existing backend APIs.

## 1. API Service Base Class

### `lib/services/api_service.dart`

```dart
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../utils/constants.dart';

class ApiService {
  late Dio _dio;
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  ApiService({required String baseUrl}) {
    _dio = Dio(BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    ));

    // Add interceptors for logging and token management
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        // Add auth token to requests if available
        final token = await _storage.read(key: 'auth_token');
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (DioException error, handler) {
        // Handle common errors
        print('API Error: ${error.message}');
        return handler.next(error);
      },
    ));
  }

  Dio get dio => _dio;
}
```

## 2. Document Service

### `lib/services/document_service.dart`

```dart
import 'dart:io';
import 'package:dio/dio.dart';
import 'api_service.dart';
import '../utils/constants.dart';
import '../models/document.dart';

class DocumentService {
  final ApiService _apiService;

  DocumentService() : _apiService = ApiService(baseUrl: ApiConstants.documentBaseUrl);

  /// Upload a file to the server
  Future<Map<String, dynamic>> uploadFile(File file) async {
    try {
      final formData = FormData.fromMap({
        'file': await MultipartFile.fromFile(
          file.path,
          filename: file.path.split('/').last,
        ),
      });

      final response = await _apiService.dio.post(
        '/uploadfile/',
        data: formData,
        options: Options(
          headers: {'Content-Type': 'multipart/form-data'},
        ),
      );

      return response.data;
    } catch (e) {
      throw Exception('Error uploading file: $e');
    }
  }

  /// Get list of files in a directory
  Future<List<Document>> getFiles(String directory) async {
    try {
      final response = await _apiService.dio.get('/listfiles/$directory');

      final data = response.data;
      if (data == null || data['files'] == null || data['files'].isEmpty) {
        return [];
      }

      return (data['files'] as List)
          .map((fileName) => Document(name: fileName))
          .toList();
    } catch (e) {
      throw Exception('Error fetching files: $e');
    }
  }

  /// Parse a file
  Future<Map<String, dynamic>> parseFile(String fileName) async {
    try {
      final response = await _apiService.dio.get('/parsefile/$fileName');
      return response.data;
    } catch (e) {
      throw Exception('Error parsing file: $e');
    }
  }

  /// Save and ingest content
  Future<Map<String, dynamic>> saveContent(String fileName, String content) async {
    try {
      final response = await _apiService.dio.post(
        '/saveandingst/$fileName',
        data: {'content': content},
      );
      return response.data;
    } catch (e) {
      throw Exception('Error saving content: $e');
    }
  }

  /// Summarize content
  Future<Map<String, dynamic>> summarizeContent(String fileName) async {
    try {
      final response = await _apiService.dio.get('/summarizecontent/$fileName');
      return response.data;
    } catch (e) {
      throw Exception('Error summarizing content: $e');
    }
  }

  /// Delete a file
  Future<Map<String, dynamic>> deleteFile(String directory, String fileName) async {
    try {
      final response = await _apiService.dio.delete('/deletefile/$directory/$fileName');
      return response.data;
    } catch (e) {
      throw Exception('Error deleting file: $e');
    }
  }

  /// Generate questions from document
  Future<Map<String, dynamic>> generateDocumentPrompts(
    String fileName, {
    int? numberOfQuestions,
  }) async {
    try {
      String url = '/generatequestions/$fileName';
      if (numberOfQuestions != null && numberOfQuestions > 0) {
        url += '?noOfQuestions=$numberOfQuestions';
      }

      final response = await _apiService.dio.get(url);
      return response.data;
    } catch (e) {
      throw Exception('Error generating prompts: $e');
    }
  }

  /// Hybrid search
  Future<Map<String, dynamic>> getSearchResults(
    String query, {
    String? sourceDocument,
  }) async {
    try {
      final payload = <String, dynamic>{'query': query};
      if (sourceDocument != null && sourceDocument.isNotEmpty) {
        payload['source_document'] = sourceDocument;
      }

      final response = await _apiService.dio.post(
        '/hybridsearch/',
        data: payload,
      );
      return response.data;
    } catch (e) {
      throw Exception('Error searching: $e');
    }
  }
}
```

## 3. Agent Service

### `lib/services/agent_service.dart`

```dart
import 'package:dio/dio.dart';
import 'api_service.dart';
import '../utils/constants.dart';

class AgentService {
  final ApiService _apiService;

  AgentService() : _apiService = ApiService(baseUrl: ApiConstants.agentBaseUrl);

  /// Insert document to Firestore
  Future<Map<String, dynamic>> firestoreInsert(Map<String, dynamic> document) async {
    try {
      final response = await _apiService.dio.post(
        '/firestore/insert',
        data: {'document': document},
      );
      return response.data;
    } catch (e) {
      throw Exception('Error inserting document: $e');
    }
  }

  /// Select document from Firestore
  Future<Map<String, dynamic>> firestoreSelect(String orgId, String agentId) async {
    try {
      final response = await _apiService.dio.post(
        '/firestore/select',
        data: {
          'Org_Id': orgId,
          'Agent_Id': agentId,
        },
      );
      return response.data;
    } catch (e) {
      throw Exception('Error selecting document: $e');
    }
  }

  /// Populate Excel
  Future<Map<String, dynamic>> populateExcel(
    String orgId,
    String agentId,
    String fileName,
  ) async {
    try {
      final response = await _apiService.dio.post(
        '/populate_excel',
        data: {
          'Org_Id': orgId,
          'Agent_Id': agentId,
          'file_name': fileName,
        },
      );
      return response.data;
    } catch (e) {
      throw Exception('Error populating Excel: $e');
    }
  }

  /// Get agents list
  Future<List<dynamic>> firestoreList(String orgId) async {
    try {
      final response = await _apiService.dio.post(
        '/firestore/getAgentsList',
        data: {'Org_Id': orgId},
      );
      return response.data as List<dynamic>;
    } catch (e) {
      throw Exception('Error listing agents: $e');
    }
  }
}
```

## 4. Authentication Service

### `lib/services/auth_service.dart`

```dart
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthService {
  final GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: ['email', 'profile'],
  );
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  /// Sign in with Google
  Future<GoogleSignInAccount?> signInWithGoogle() async {
    try {
      final account = await _googleSignIn.signIn();
      if (account != null) {
        final auth = await account.authentication;

        // Store the token securely
        await _storage.write(key: 'auth_token', value: auth.accessToken);
        await _storage.write(key: 'user_email', value: account.email);
        await _storage.write(key: 'user_name', value: account.displayName);

        return account;
      }
      return null;
    } catch (e) {
      throw Exception('Error signing in with Google: $e');
    }
  }

  /// Sign out
  Future<void> signOut() async {
    try {
      await _googleSignIn.signOut();
      await _storage.deleteAll();
    } catch (e) {
      throw Exception('Error signing out: $e');
    }
  }

  /// Check if user is signed in
  Future<bool> isSignedIn() async {
    final token = await _storage.read(key: 'auth_token');
    return token != null;
  }

  /// Get current user info
  Future<Map<String, String?>> getCurrentUser() async {
    return {
      'email': await _storage.read(key: 'user_email'),
      'name': await _storage.read(key: 'user_name'),
    };
  }
}
```

## 5. Models

### `lib/models/document.dart`

```dart
class Document {
  final String name;

  Document({required this.name});

  factory Document.fromJson(Map<String, dynamic> json) {
    return Document(name: json['name'] as String);
  }

  Map<String, dynamic> toJson() {
    return {'name': name};
  }
}
```

### `lib/models/user.dart`

```dart
class User {
  final String id;
  final String name;
  final String email;

  User({
    required this.id,
    required this.name,
    required this.email,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as String,
      name: json['name'] as String,
      email: json['email'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
    };
  }
}
```

## 6. Constants

### `lib/utils/constants.dart`

```dart
class ApiConstants {
  // Base URLs
  static const String agentBaseUrl = 'http://127.0.0.1:5000';
  static const String documentBaseUrl =
      'https://document-processing-service-38231329931.us-central1.run.app';

  // For local testing on physical device, replace localhost with your machine's IP
  // static const String agentBaseUrl = 'http://192.168.1.x:5000';

  // Endpoints
  static const String uploadFile = '/uploadfile/';
  static const String listFiles = '/listfiles/';
  static const String parseFile = '/parsefile/';
  static const String saveAndIngest = '/saveandingst/';
  static const String summarizeContent = '/summarizecontent/';
  static const String deleteFile = '/deletefile/';
  static const String generateQuestions = '/generatequestions/';
  static const String hybridSearch = '/hybridsearch/';

  // Agent endpoints
  static const String firestoreInsert = '/firestore/insert';
  static const String firestoreSelect = '/firestore/select';
  static const String populateExcel = '/populate_excel';
  static const String getAgentsList = '/firestore/getAgentsList';

  // App constants
  static const int requestTimeout = 30000; // 30 seconds
  static const int maxUploadSize = 10485760; // 10 MB
}
```

## 7. Usage Example

### Example Screen Using Services

```dart
import 'package:flutter/material.dart';
import '../services/document_service.dart';
import '../services/auth_service.dart';

class DocumentListScreen extends StatefulWidget {
  const DocumentListScreen({Key? key}) : super(key: key);

  @override
  State<DocumentListScreen> createState() => _DocumentListScreenState();
}

class _DocumentListScreenState extends State<DocumentListScreen> {
  final DocumentService _documentService = DocumentService();
  final AuthService _authService = AuthService();
  List<dynamic> _documents = [];
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _loadDocuments();
  }

  Future<void> _loadDocuments() async {
    setState(() => _isLoading = true);

    try {
      final docs = await _documentService.getFiles('uploads');
      setState(() {
        _documents = docs;
        _isLoading = false;
      });
    } catch (e) {
      setState(() => _isLoading = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error loading documents: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Documents')),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: _documents.length,
              itemBuilder: (context, index) {
                final doc = _documents[index];
                return ListTile(
                  title: Text(doc.name),
                  trailing: IconButton(
                    icon: const Icon(Icons.delete),
                    onPressed: () async {
                      await _documentService.deleteFile('uploads', doc.name);
                      _loadDocuments();
                    },
                  ),
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Navigate to upload screen
        },
        child: const Icon(Icons.upload),
      ),
    );
  }
}
```

## Testing API Integration

### Test the services before integrating with UI:

```dart
void testAPIs() async {
  final docService = DocumentService();
  final agentService = AgentService();

  // Test document listing
  try {
    final files = await docService.getFiles('uploads');
    print('Files: $files');
  } catch (e) {
    print('Error: $e');
  }

  // Test search
  try {
    final results = await docService.getSearchResults('test query');
    print('Search results: $results');
  } catch (e) {
    print('Error: $e');
  }
}
```

## Important Notes

1. **CORS Configuration**: Ensure backend APIs allow requests from mobile apps
2. **Local Development**: Replace `localhost` with actual IP address when testing on physical devices
3. **Error Handling**: Implement proper error handling and user feedback
4. **Token Management**: Use secure storage for authentication tokens
5. **Network Permissions**:
   - iOS: Add to `Info.plist` for HTTP requests (if using HTTP in dev)
   - Android: Add internet permission to `AndroidManifest.xml`

### Android Network Permissions

Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### iOS HTTP Configuration (Development Only)

Add to `ios/Runner/Info.plist`:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

**Important**: Remove this in production and use HTTPS only!
