/**
 * ========================================
 * FIREBASE CONFIGURATION - MOBILE APP
 * ========================================
 *
 * Firebase setup for React Native/Expo
 * Handles Firestore, Auth, and Storage
 */

import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import {
  Firestore,
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

// Firebase configuration
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "your_api_key_here",
  authDomain:
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "your_project.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "your_project_id",
  storageBucket:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "your_project.appspot.com",
  messagingSenderId:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abc123",
};

// Check if Firebase config is complete (not placeholder values)
const hasRealApiKey =
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey.length > 20 &&
  !firebaseConfig.apiKey.includes("your_");

const isFirebaseConfigured =
  hasRealApiKey && firebaseConfig.projectId && firebaseConfig.authDomain;

// Initialize Firebase
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

try {
  if (isFirebaseConfigured) {
    // Check if Firebase has already been initialized
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
      console.log("✅ Firebase initialized successfully");
    } else {
      app = getApps()[0];
      console.log("✅ Firebase already initialized");
    }

    // Initialize Firebase Authentication
    auth = getAuth(app);

    // Initialize Cloud Firestore with offline persistence
    try {
      db = initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      });
      console.log("✅ Firestore initialized with offline persistence");
    } catch (persistenceError) {
      // Fallback to default Firestore if persistence fails
      db = getFirestore(app);
      console.warn("⚠️ Offline persistence failed, using default Firestore");
    }

    // Initialize Firebase Storage
    storage = getStorage(app);
  } else {
    console.warn("⚠️ Firebase not configured - using placeholder values");
    console.warn("⚠️ Please set EXPO_PUBLIC_FIREBASE_* environment variables");
  }
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
}

export { auth, db, storage };
export default app;
