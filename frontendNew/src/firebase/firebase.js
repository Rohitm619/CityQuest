import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxp56dJfbVFCfx3pSefzMLrB4H7qrQBDM",
    authDomain: "city-quest-e49fc.firebaseapp.com",
    projectId: "city-quest-e49fc",
    storageBucket: "city-quest-e49fc.appspot.com",
    messagingSenderId: "871339577083",
    appId: "1:871339577083:web:0af9f2fa2d414f1a48ea5e",
    measurementId: "G-GLS4ZFQS9Q"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();