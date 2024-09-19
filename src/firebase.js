import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyA53YKt33stz3pglzBYyzvCFFEdPGO69No",
  authDomain: "flowboard-df723.firebaseapp.com",
  projectId: "flowboard-df723",
  storageBucket: "flowboard-df723.appspot.com",
  messagingSenderId: "339719779379",
  appId: "1:339719779379:web:82e18391f5d794ecf0df46",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8082);
  connectFunctionsEmulator(fbFunctions, "localhost", 5002);
}