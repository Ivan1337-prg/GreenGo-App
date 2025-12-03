import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  OAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzd9oqczHxPdj6Nvrv3-xrXBKFt2ccx1M",
  authDomain: "greengo-e1fda.firebaseapp.com",
  projectId: "greengo-e1fda",
  storageBucket: "greengo-e1fda.firebasestorage.app",
  messagingSenderId: "602081185476",
  appId: "1:602081185476:web:665c76f8b44e4e9f020391",
  measurementId: "G-7XV54W8PS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Auth Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Auth Functions
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);
export const signInWithApple = () => signInWithPopup(auth, appleProvider);
export const signInWithEmail = (email, password) => 
  signInWithEmailAndPassword(auth, email, password);
export const signUpWithEmail = (email, password) => 
  createUserWithEmailAndPassword(auth, email, password);
export const logoutUser = () => signOut(auth);
export const getCurrentUser = () => auth.currentUser;

// Auth State Listener
export const onAuthStateChange = (callback) => onAuthStateChanged(auth, callback);

export { auth };
export default app;