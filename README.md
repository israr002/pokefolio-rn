# Pokefolio - Your Personal Pokemon Collection

A React Native application that allows users to browse, collect, and manage their favorite Pokemon. Built with TypeScript, React Native, and Firebase.

## Demo
Check out the app demo: [Watch Demo Video](https://www.loom.com/share/2620d2e6323940419739e580abcc1af4?sid=53d09392-bdc4-4c43-b845-660d97529bc9)

### Video Walkthrough:

- **Google Authentication**: Demonstrates secure sign-in using Firebase Authentication with Google.
- **Paginated Pokemon List**: Showcases infinite scroll implementation using PokéAPI.
- **Navigation to Details Screen**: Tap on a Pokemon to view its types, abilities, and dynamically themed background.
- **Push Notifications**: Firebase Cloud Messaging integrated to receive notifications.
- **State Persistence**: Button state and login status are retained after restarting the app.

## Features

- Browse and search Pokemon
- View detailed Pokemon information
- User authentication (Email & Google Sign-in)
- Email verification
- Push notifications for Pokemon updates
- Responsive UI with animations
- Profile picture upload (requires Firebase Storage setup)

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- Firebase account

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pokefolio.git
   cd pokefolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Environment Setup**

   Create a `.env` file in the root directory with the following variables:
   ```
   # Google Sign-in Configuration
   GOOGLE_WEB_CLIENT_ID=YOUR_WEB_CLIENT_ID
   GOOGLE_IOS_CLIENT_ID=YOUR_IOS_CLIENT_ID
   ```

5. **Firebase Setup**

   - Create a new Firebase project
   - Enable Email/Password and Google authentication
   - Enable Firebase Storage (required for profile picture upload)
     - Go to Firebase Console > Storage
     - Click "Get Started"
     - Choose a location for your storage
     - Set up security rules for storage access
   - Download the `google-services.json` file and place it in:
     - Android: `android/app/google-services.json`
     - iOS: `ios/GoogleService-Info.plist`

6. **Google Sign-in Setup**

   Follow these steps to set up Google Sign-in:

   1. **Enable Google Sign-in in Firebase**:
      - Go to Firebase Console
      - Select your project
      - Navigate to Authentication > Sign-in method
      - Enable Google under "Sign-in providers"
      - Set your Project Support Email

   2. **Android Setup - Add SHA Fingerprints**:
      - Go to Project settings > General
      - Scroll to "Your apps" > Select Android app
      - Add SHA-1 and SHA-256 fingerprints
      - You can get these fingerprints using:
        ```bash
        # Using keytool
        keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
        ```

   3. **iOS Setup - Add Bundle ID**:
      - In Firebase Console, go to Project settings > General
      - Under "Your apps", ensure your iOS app is registered
      - Add your Bundle ID (e.g., com.yourcompany.pokefolio)
      - Download the updated `GoogleService-Info.plist`

## Running the App

### iOS
```bash
npm run ios
# or
yarn ios
```

### Android
```bash
npm run android
# or
yarn android
```

## Project Structure

```
src/
├── api/           # API services and endpoints
├── assets/        # Images, fonts, and other static assets
├── components/    # Reusable UI components
├── constants/     # App constants and configuration
├── contexts/      # React contexts
├── hooks/         # Custom React hooks
├── navigation/    # Navigation configuration
├── screens/       # Screen components
├── services/      # Business logic and services
├── theme/         # Theme configuration
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Technical Approach

- **State Management**: React Query for server state and React Context for auth state
- **Navigation**: React Navigation with TypeScript support
- **Authentication**: Firebase Authentication
- **API Integration**: Axios
- **UI Components**: Custom components with consistent styling
- **Testing**: Jest and React Native Testing Library
- **Animations**: React Native Reanimated
- **Push Notifications**: Firebase Cloud Messaging
- **Persistent Storage**: MMKV 
- **Color Extraction [Native Module]** : Native module for extracting color from pokemon image
- **Storage**: Firebase Storage for profile pictures

## Assumptions and Limitations

1. **API Limitations**:
   - Using the free PokeAPI which has rate limits
   - Pokemon data are cached to improve performance

2. **Authentication**:
   - Email verification is required for full access
   - Google Sign-in requires proper setup in Google Cloud Console
   - Profile picture upload requires Firebase Storage setup

3. **Device Support**:
   - iOS 13.0 or later
   - Android 6.0 (API level 23) or later

4. **Offline Support**:
   - Basic offline functionality with cached data
   - Some features require internet connection

5. **Storage**:
   - Profile picture upload requires Firebase Storage

## Testing

Run the test suite:
```bash
npm test
# or
yarn test
```
