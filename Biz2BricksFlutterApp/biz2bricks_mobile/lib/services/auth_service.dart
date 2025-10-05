import 'package:flutter/foundation.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

/// Authentication Service for Biz2Bricks
/// Handles Google and GitHub OAuth authentication with actual OAuth implementation
class AuthService {
  // Singleton pattern
  static final AuthService _instance = AuthService._internal();
  factory AuthService() => _instance;
  AuthService._internal();

  // Google Sign-In configuration
  final GoogleSignIn _googleSignIn = GoogleSignIn(
    clientId: kIsWeb
        ? '620244633976-ebcp9dd35apjl2nqhkgris78bnfcb0vs.apps.googleusercontent.com'
        : null, // For web, we need to specify clientId
    scopes: [
      'email',
      'profile',
    ],
  );

  // Secure storage for tokens
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  // Store authentication state
  String? _userEmail;
  String? _userName;
  String? _userPhotoUrl;
  String? _authToken;
  bool _isAuthenticated = false;

  // Getters
  bool get isAuthenticated => _isAuthenticated;
  String? get userEmail => _userEmail;
  String? get userName => _userName;
  String? get userPhotoUrl => _userPhotoUrl;
  String? get authToken => _authToken;

  /// Sign in with Google
  /// Uses actual Google OAuth with google_sign_in package
  Future<bool> signInWithGoogle() async {
    try {
      debugPrint('🔐 Starting Google Sign-In...');

      // Attempt to sign in
      final GoogleSignInAccount? account = await _googleSignIn.signIn();

      if (account == null) {
        debugPrint('❌ User cancelled sign-in');
        return false;
      }

      // Get authentication details
      final GoogleSignInAuthentication auth = await account.authentication;

      // Store user information
      _userEmail = account.email;
      _userName = account.displayName ?? 'User';
      _userPhotoUrl = account.photoUrl;
      _authToken = auth.accessToken;
      _isAuthenticated = true;

      // Save to secure storage
      await _storage.write(key: 'auth_token', value: auth.accessToken);
      await _storage.write(key: 'user_email', value: account.email);
      await _storage.write(key: 'user_name', value: _userName);
      await _storage.write(key: 'user_photo', value: _userPhotoUrl);

      debugPrint('✅ Google Sign-In successful!');
      debugPrint('   User: $_userName');
      debugPrint('   Email: $_userEmail');
      debugPrint('   Has Token: ${_authToken != null}');

      return true;
    } catch (error) {
      debugPrint('❌ Error signing in with Google: $error');
      return false;
    }
  }

  /// Sign in with GitHub
  /// For now, this shows a message as GitHub OAuth requires more complex setup
  Future<bool> signInWithGitHub() async {
    try {
      debugPrint('ℹ️  GitHub Sign-In requires additional OAuth configuration');
      debugPrint('   Please use Google Sign-In for now');

      // TODO: Implement GitHub OAuth
      // This requires setting up OAuth flow with GitHub
      // For now, show that it's not implemented

      return false;
    } catch (e) {
      debugPrint('Error with GitHub sign-in: $e');
      return false;
    }
  }

  /// Sign out
  Future<void> signOut() async {
    try {
      debugPrint('🚪 Signing out...');

      // Sign out from Google
      await _googleSignIn.signOut();

      // Clear local state
      _userEmail = null;
      _userName = null;
      _userPhotoUrl = null;
      _authToken = null;
      _isAuthenticated = false;

      // Clear secure storage
      await _storage.deleteAll();

      debugPrint('✅ User signed out successfully');
    } catch (e) {
      debugPrint('Error signing out: $e');
      throw Exception('Error signing out: $e');
    }
  }

  /// Check if user is signed in
  Future<bool> checkAuthStatus() async {
    try {
      // Try to sign in silently
      final account = await _googleSignIn.signInSilently();

      if (account != null) {
        final auth = await account.authentication;

        _userEmail = account.email;
        _userName = account.displayName ?? 'User';
        _userPhotoUrl = account.photoUrl;
        _authToken = auth.accessToken;
        _isAuthenticated = true;

        debugPrint('✅ Auto sign-in successful for: $_userEmail');
        return true;
      }

      // Check secure storage
      final token = await _storage.read(key: 'auth_token');
      if (token != null) {
        _authToken = token;
        _userEmail = await _storage.read(key: 'user_email');
        _userName = await _storage.read(key: 'user_name');
        _userPhotoUrl = await _storage.read(key: 'user_photo');
        _isAuthenticated = true;
        return true;
      }

      return false;
    } catch (e) {
      debugPrint('Error checking auth status: $e');
      return false;
    }
  }

  /// Get current user info
  Map<String, String?> getCurrentUser() {
    return {
      'email': _userEmail,
      'name': _userName,
      'photo': _userPhotoUrl,
      'token': _authToken,
    };
  }

  /// Check if currently signed in (synchronous)
  bool isCurrentlySignedIn() {
    return _isAuthenticated && _userEmail != null;
  }
}
