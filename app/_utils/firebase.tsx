import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwD2fYGCnxAogsgS39DEfry6E6gFgay_g",
  authDomain: "cprg306-assignments-ec08b.firebaseapp.com",
  projectId: "cprg306-assignments-ec08b",
  storageBucket: "cprg306-assignments-ec08b.firebasestorage.app",
  messagingSenderId: "618175754336",
  appId: "1:618175754336:web:b293344e130bf45d64d305",
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);