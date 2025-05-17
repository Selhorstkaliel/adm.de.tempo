import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth }      from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AlzaSyC4…K0O",
  authDomain: "banco-site-tempo.firebaseapp.com",
  projectId: "banco-site-tempo",
  storageBucket: "banco-site-tempo.appspot.com",
  messagingSenderId: "301830730168",
  appId: "1:301830730168:web:abcdef1234567890"
};

export const app   = initializeApp(firebaseConfig);
export const auth  = getAuth(app);
export const db    = getFirestore(app);
