// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: 'AIzaSyBbHQrXLroru3nTIGSb1Fc62kKazRF56pE',
    authDomain: 'flandria-yachts.firebaseapp.com',
    projectId: 'flandria-yachts',
    storageBucket: 'flandria-yachts.appspot.com',
    messagingSenderId: '1014227351431',
    appId: '1:1014227351431:web:909aaed54b04b33bb94522',
    measurementId: 'G-7J8L45S9KQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const signInWithGooglePopup = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
        const result = await signInWithPopup(auth, provider);
        // You might want to return the user or handle navigation here
        return result.user;
    } catch (error) {
        console.error('Google sign-in error:', error);
        throw error;
    }
};

export const handleEmailLogin = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // You might want to return the user or handle navigation here
        return userCredential.user;
    } catch (error) {
        console.error('Email login error:', error);
        throw error; // Re-throw the error if you want to handle it where the function is called
    }
};
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
//export logout function
export const logout = () => {
    window.location.href = '/login';
    auth.signOut();
};
//export firestore db
export const db = getFirestore(app);

export default app;
