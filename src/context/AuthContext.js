import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';

// Configure Google Auth Provider for better Safari compatibility
const googleProvider = new GoogleAuthProvider();
// Add scopes if needed
googleProvider.addScope('email');
googleProvider.addScope('profile');
// Set custom parameters for better Safari support
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
        // Determine admin role based on specific email
        const email = firebaseUser.email || '';
        const adminEmail = process.env.REACT_APP_ADMIN_EMAIL || 'raimanishkumar52@gmail.com';
        const isAdmin = email.toLowerCase() === adminEmail.toLowerCase();
        
        // Set user data from Firebase Auth
        setUserData({
          id: firebaseUser.uid,
          email: email,
          name: firebaseUser.displayName || email.split('@')[0],
          role: isAdmin ? 'admin' : 'user',
          phone: firebaseUser.phoneNumber || '',
          photoURL: firebaseUser.photoURL || null
        });
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      let message = 'Login failed';
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          message = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          message = 'This account has been disabled';
          break;
        case 'auth/too-many-requests':
          message = 'Too many failed attempts. Please try again later';
          break;
        default:
          message = error.message;
      }
      return { success: false, message };
    }
  };

  const register = async (email, password, name, phone) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with name
      if (name && userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
      }

      return { success: true };
    } catch (error) {
      let message = 'Registration failed';
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'An account with this email already exists';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email address';
          break;
        case 'auth/weak-password':
          message = 'Password should be at least 6 characters';
          break;
        case 'auth/operation-not-allowed':
          message = 'Email/password accounts are not enabled';
          break;
        default:
          message = error.message;
      }
      return { success: false, message };
    }
  };

  const googleLogin = async () => {
    try {
      // Use signInWithPopup for better Safari compatibility
      // Safari has better support for popups than redirects
      await signInWithPopup(auth, googleProvider);
      return { success: true };
    } catch (error) {
      let message = 'Google login failed';
      
      // Handle specific error codes
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          message = 'Login popup was closed. Please try again.';
          break;
        case 'auth/cancelled-popup-request':
          message = 'Login was cancelled. Please try again.';
          break;
        case 'auth/popup-blocked':
          message = 'Popup was blocked by your browser. Please allow popups for this site and try again.';
          break;
        case 'auth/unauthorized-domain':
          message = 'This domain is not authorized. Please contact support.';
          console.error('Unauthorized domain error. Make sure your domain is added to Firebase authorized domains.');
          break;
        case 'auth/operation-not-allowed':
          message = 'Google sign-in is not enabled. Please contact support.';
          break;
        case 'auth/network-request-failed':
          message = 'Network error. Please check your internet connection and try again.';
          break;
        default:
          message = error.message || 'An unexpected error occurred. Please try again.';
          console.error('Google login error:', error);
      }
      
      return { success: false, message };
    }
  };

  const phoneLogin = async (phoneNumber, name) => {
    try {
      // Initialize reCAPTCHA verifier
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            console.log('reCAPTCHA expired');
          }
        });
      }

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      
      // Store confirmation result for later use
      window.confirmationResult = confirmationResult;
      
      return { 
        success: true, 
        requiresVerification: true,
        confirmationResult 
      };
    } catch (error) {
      let message = 'Phone login failed';
      switch (error.code) {
        case 'auth/invalid-phone-number':
          message = 'Invalid phone number format';
          break;
        case 'auth/too-many-requests':
          message = 'Too many requests. Please try again later';
          break;
        case 'auth/captcha-check-failed':
          message = 'reCAPTCHA verification failed. Please try again';
          break;
        default:
          message = error.message;
      }
      
      // Clean up verifier on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      
      return { success: false, message };
    }
  };

  const verifyPhoneCode = async (code) => {
    try {
      if (!window.confirmationResult) {
        return { success: false, message: 'No verification in progress' };
      }

      await window.confirmationResult.confirm(code);
      
      // Clean up
      window.confirmationResult = null;
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      
      return { success: true };
    } catch (error) {
      let message = 'Verification failed';
      if (error.code === 'auth/invalid-verification-code') {
        message = 'Invalid verification code. Please try again';
      } else if (error.code === 'auth/code-expired') {
        message = 'Verification code has expired. Please request a new one';
      } else {
        message = error.message;
      }
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAdmin = () => {
    return userData && userData.role === 'admin';
  };

  const value = {
    user,
    userData,
    loading,
    login,
    register,
    googleLogin,
    phoneLogin,
    verifyPhoneCode,
    logout,
    isAdmin: isAdmin()
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
