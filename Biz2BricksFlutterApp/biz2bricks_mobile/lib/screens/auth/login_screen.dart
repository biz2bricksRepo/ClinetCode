import 'package:flutter/material.dart';
import '../../services/auth_service.dart';
import '../../utils/constants.dart';

/// Login Screen for Biz2Bricks Mobile App
/// Provides Google and GitHub authentication options
/// Similar to the React/Next.js sign-in component
class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final AuthService _authService = AuthService();
  bool _isLoading = false;

  /// Handle Google Sign-In
  Future<void> _handleGoogleSignIn() async {
    setState(() => _isLoading = true);

    try {
      final success = await _authService.signInWithGoogle();
      print('Google Sign-In Success: $success');

      if (success && mounted) {
        // Wait a bit to ensure state is saved
        await Future.delayed(const Duration(milliseconds: 100));

        // Navigate to home screen on successful login
        if (mounted) {
          Navigator.of(context).pushReplacementNamed(AppRoutes.home);

          // Show success message
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Signed in successfully!'),
              backgroundColor: Colors.green,
            ),
          );
        }
      } else if (mounted) {
        _showErrorMessage('Google sign-in failed. Please try again.');
      }
    } catch (e) {
      if (mounted) {
        _showErrorMessage('Error: $e');
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  /// Handle GitHub Sign-In
  Future<void> _handleGitHubSignIn() async {
    setState(() => _isLoading = true);

    try {
      final success = await _authService.signInWithGitHub();

      if (success && mounted) {
        // Navigate to home screen on successful login
        Navigator.of(context).pushReplacementNamed(AppRoutes.home);

        // Show success message
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Signed in successfully!'),
            backgroundColor: Colors.green,
          ),
        );
      } else if (mounted) {
        _showErrorMessage('GitHub sign-in failed. Please try again.');
      }
    } catch (e) {
      if (mounted) {
        _showErrorMessage('Error: $e');
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  /// Show error message
  void _showErrorMessage(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.red,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // App Logo/Title Section
                _buildHeader(),

                const SizedBox(height: 48),

                // Welcome Text
                _buildWelcomeText(),

                const SizedBox(height: 32),

                // Sign-in Buttons
                _buildSignInButtons(),

                const SizedBox(height: 24),

                // Loading Indicator
                if (_isLoading)
                  const Center(
                    child: CircularProgressIndicator(),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  /// Build header with app branding
  Widget _buildHeader() {
    return Column(
      children: [
        // App Icon/Logo
        Container(
          width: 100,
          height: 100,
          decoration: BoxDecoration(
            color: const Color(AppColors.primaryBlue),
            borderRadius: BorderRadius.circular(20),
          ),
          child: const Icon(
            Icons.description,
            size: 60,
            color: Colors.white,
          ),
        ),

        const SizedBox(height: 16),

        // App Name
        const Text(
          'Biz2Bricks',
          style: TextStyle(
            fontSize: 32,
            fontWeight: FontWeight.bold,
            color: Color(AppColors.darkGray),
          ),
        ),

        const SizedBox(height: 8),

        // Tagline
        Text(
          'Document Processing & Insights',
          style: TextStyle(
            fontSize: 16,
            color: Colors.grey[600],
          ),
        ),
      ],
    );
  }

  /// Build welcome text
  Widget _buildWelcomeText() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Welcome to Biz2Bricks',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: Color(AppColors.darkGray),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Sign in to continue',
          style: TextStyle(
            fontSize: 16,
            color: Colors.grey[600],
          ),
        ),
      ],
    );
  }

  /// Build sign-in buttons
  Widget _buildSignInButtons() {
    return Column(
      children: [
        // Google Sign-In Button
        ElevatedButton.icon(
          onPressed: _isLoading ? null : _handleGoogleSignIn,
          icon: const Icon(Icons.login, color: Colors.white),
          label: const Text(
            'Sign in with Google',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: Colors.white,
            ),
          ),
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(AppColors.primaryBlue),
            padding: const EdgeInsets.symmetric(vertical: 16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
            elevation: 2,
          ),
        ),

        const SizedBox(height: 16),

        // GitHub Sign-In Button
        ElevatedButton.icon(
          onPressed: _isLoading ? null : _handleGitHubSignIn,
          icon: const Icon(Icons.code, color: Colors.white),
          label: const Text(
            'Sign in with GitHub',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: Colors.white,
            ),
          ),
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(AppColors.darkGray),
            padding: const EdgeInsets.symmetric(vertical: 16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
            elevation: 2,
          ),
        ),

        const SizedBox(height: 24),

        // Info text
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            'Note: For web demo, authentication is simulated. In production, this will use OAuth with your backend.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 12,
              color: Colors.grey[500],
              fontStyle: FontStyle.italic,
            ),
          ),
        ),
      ],
    );
  }
}
