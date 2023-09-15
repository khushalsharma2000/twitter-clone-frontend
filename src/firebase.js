// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAHRvhpByCztGDTwxIeJcCMFELLB7TtoE",
  authDomain: "twitter-clone-c2fc6.firebaseapp.com",
  projectId: "twitter-clone-c2fc6",
  storageBucket: "twitter-clone-c2fc6.appspot.com",
  messagingSenderId: "756342093082",
  appId: "1:756342093082:web:821c023c760c42aa6ba8a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;