import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyChtPhZkqIokHkgMGybuo5SgGQC8Re1syk",
  authDomain: "tennistracker-snewt.firebaseapp.com",
  databaseURL: "https://tennistracker-snewt.firebaseio.com",
  projectId: "tennistracker-snewt",
  storageBucket: "tennistracker-snewt.appspot.com",
  messagingSenderId: "395642017832"
});

const firestore = firebaseApp.firestore();
firestore.settings({
  timestampsInSnapshots: true
});

export const db = firestore;