import 'package:flutter/material.dart';
import 'screens/auth/login_screen.dart';
import 'screens/home/home_screen.dart';
import 'utils/constants.dart';

void main() {
  runApp(const Biz2BricksApp());
}

/// Biz2Bricks Mobile Application
/// A native mobile app for document processing and insights
/// Consumes the same backend APIs as the React/Next.js web app
class Biz2BricksApp extends StatelessWidget {
  const Biz2BricksApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Biz2Bricks',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        // Primary color scheme
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(AppColors.primaryBlue),
          brightness: Brightness.light,
        ),

        // App bar theme
        appBarTheme: const AppBarTheme(
          centerTitle: true,
          elevation: 0,
        ),

        // Card theme
        cardTheme: const CardThemeData(
          elevation: 2,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(8)),
          ),
        ),

        // Input decoration theme
        inputDecorationTheme: InputDecorationTheme(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          contentPadding: const EdgeInsets.symmetric(
            horizontal: 16,
            vertical: 12,
          ),
        ),

        // Use Material 3
        useMaterial3: true,
      ),

      // Routes
      initialRoute: AppRoutes.login,
      routes: {
        AppRoutes.login: (context) => const LoginScreen(),
        AppRoutes.home: (context) => const HomeScreen(),
      },
    );
  }
}
