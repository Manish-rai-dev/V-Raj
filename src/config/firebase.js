import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// Values are loaded from environment variables for security
// Fallback to direct values if env vars are not loaded (for development)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Validate configuration
if (!firebaseConfig.projectId) {
  console.error('Firebase configuration error: projectId is missing!');
  console.error('Please check your .env file or Firebase configuration.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Note: For Safari compatibility, ensure your domain is added to Firebase authorized domains:
// 1. Go to Firebase Console → Authentication → Settings → Authorized domains
// 2. Add your production domain (e.g., yourdomain.com)
// 3. For local development, 'localhost' is automatically authorized
// Using signInWithPopup (instead of signInWithRedirect) provides better Safari support

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Export analytics if available
export { analytics };

export default app;
