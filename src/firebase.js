import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCzph8iFOgYSZFXflx3GvOXM40_Zo2HASM",
    authDomain: "ecommerce-thedevpiyush.firebaseapp.com",
    projectId: "ecommerce-thedevpiyush",
    storageBucket: "ecommerce-thedevpiyush.firebasestorage.app",
    messagingSenderId: "515708653535",
    appId: "1:515708653535:web:752f2524545ed8d42bfe6a"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
const auth = getAuth();
setPersistence(auth, browserLocalPersistence);