import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB98exdoPmUjljmLnizU-DPvUIMcoLLnSM",
  authDomain: "cxr-report.firebaseapp.com",
  projectId: "cxr-report",
  storageBucket: "cxr-report.appspot.com",
  messagingSenderId: "992981864946",
  appId: "1:992981864946:web:47fab93f2f43dc2d825b6b"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);