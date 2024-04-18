// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwBbzlyQui-MpKwZpQ0125WL-m3OZ3rdg",
  authDomain: "khanhhy-774e1.firebaseapp.com",
  projectId: "khanhhy-774e1",
  storageBucket: "khanhhy-774e1.appspot.com",
  messagingSenderId: "171553101518",
  appId: "1:171553101518:web:387c278d465079f0cfa29f",
  measurementId: "G-HRQE990RX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();