// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Thay thế bằng thông tin firebaseConfig của bạn
const firebaseConfig = {
    apiKey: "AIzaSyD6FUTtobpMxMGeUix0vrqmKYgzBZjqV0A",
    authDomain: "login-cdaa9.firebaseapp.com",
    projectId: "login-cdaa9",
    storageBucket: "login-cdaa9.appspot.com",
    messagingSenderId: "424942906867",
    appId: "1:424942906867:web:1c857b92775decc1dbb686",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Khởi tạo Auth với AsyncStorage
let auth;
if (!auth) {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
}

export { db, auth };
