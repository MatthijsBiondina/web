// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF9R5xWNkgNPV9FAMDVJhpX7jT6Yp8pq8",
  authDomain: "hondenschool-81457.firebaseapp.com",
  projectId: "hondenschool-81457",
  storageBucket: "hondenschool-81457.firebasestorage.app",
  messagingSenderId: "257584076307",
  appId: "1:257584076307:web:3f7afecc4d110cd87711e6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
