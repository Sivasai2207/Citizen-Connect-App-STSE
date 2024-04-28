import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2w_jhhEceITiN0vn_jVJ5TuawgpJfOoI",
  authDomain: "citizen-connect-edfd5.firebaseapp.com",
  projectId: "citizen-connect-edfd5",
  storageBucket: "citizen-connect-edfd5.appspot.com",
  messagingSenderId: "1096539816876",
  appId: "1:1096539816876:web:bc03ab308f7ca812fc3009",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, db, storage };
