
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYh-vpFI3M4J3DvyqTNUenihEAu73GkNo",
  authDomain: "react-native-auth-app-bad6e.firebaseapp.com",
  projectId: "react-native-auth-app-bad6e",
  storageBucket: "react-native-auth-app-bad6e.firebasestorage.app",
  messagingSenderId: "664295491127",
  appId: "1:664295491127:web:a4b758e9ab606dfa5221b2"
};

const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);