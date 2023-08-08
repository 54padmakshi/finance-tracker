// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"; 
import { getFirestore, doc, setDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoLdOWMp12NIyFrfrK3834ZbyTz_GHDwU",
  authDomain: "financely-personal.firebaseapp.com",
  projectId: "financely-personal",
  storageBucket: "financely-personal.appspot.com",
  messagingSenderId: "814030459553",
  appId: "1:814030459553:web:370ecaaaed81663a0d56e0",
  measurementId: "G-HD10WKH9HD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db =getFirestore(app);
const auth =getAuth(app);
const provider =new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };