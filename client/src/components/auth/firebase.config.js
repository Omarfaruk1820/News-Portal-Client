// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsla29K7keyxazGJeUNtHPujLNo9Mm0es",
  authDomain: "news-portal-website-8319c.firebaseapp.com",
  projectId: "news-portal-website-8319c",
  storageBucket: "news-portal-website-8319c.firebasestorage.app",
  messagingSenderId: "793424332925",
  appId: "1:793424332925:web:3af37df437a99233094914",
  measurementId: "G-7DM8DMJCED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app)
 export default auth