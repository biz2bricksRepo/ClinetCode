/// API Constants for Biz2Bricks Application
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

/// App Theme Colors
class AppColors {
  static const int primaryBlue = 0xFF2563EB; // Blue 600
  static const int darkGray = 0xFF1F2937; // Gray 800
  static const int lightGray = 0xFFF9FAFB; // Gray 50
  static const int purple = 0xFF9333EA; // Purple 600
}

/// App Routes
class AppRoutes {
  static const String login = '/';
  static const String home = '/home';
  static const String documents = '/documents';
  static const String upload = '/upload';
  static const String parse = '/parse';
  static const String summarize = '/summarize';
  static const String search = '/search';
}
