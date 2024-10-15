
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDDPhGrEBSS3n2LzPpzwBbFbF-VQE76zsw",
    authDomain: "eventflow-f1e6b.firebaseapp.com",
    projectId: "eventflow-f1e6b",
    storageBucket: "eventflow-f1e6b.appspot.com",
    messagingSenderId: "510870941453",
    appId: "1:510870941453:web:b1904112976833b8d70a44",
    measurementId: "G-HPNYZ8D3Z8"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const STORAGE = getStorage(FIREBASE_APP);