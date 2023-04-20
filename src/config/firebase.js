
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAKC6boc-NZVt5-H3iBZc2VXlTvkr2Ee-A",
    authDomain: "fir-tutorial-a859b.firebaseapp.com",
    projectId: "fir-tutorial-a859b",
    storageBucket: "fir-tutorial-a859b.appspot.com",
    messagingSenderId: "459884219562",
    appId: "1:459884219562:web:80f9860a492e33bf1a54d3",
    measurementId: "G-7JLP3QL1BK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// authentication
export const auth = getAuth(app);
// goole authentication provider
export const googleProvider = new GoogleAuthProvider();
// firestore database
export const db = getFirestore(app)
// storage
export const storage = getStorage(app)