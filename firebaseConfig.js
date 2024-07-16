import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDwSD5D_gfy4-u92lj1niW1rmy6qUZUBmU",
    authDomain: "mini-47726.firebaseapp.com",
    projectId: "mini-47726",
    storageBucket: "mini-47726.appspot.com",
    messagingSenderId: "292602548155",
    appId: "1:292602548155:web:671da8a342efe154517e9e",
    measurementId: "G-FGXPNYJ6H9"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// const storage=sto
export const imageDB=getStorage(app)