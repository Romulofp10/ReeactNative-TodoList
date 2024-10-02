import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCqM8V-p4ybVIAZJAS7s1G0nA9BciEackU",
  authDomain: "apptodolist-a7c90.firebaseapp.com",
  projectId: "apptodolist-a7c90",
  storageBucket: "apptodolist-a7c90.appspot.com",
  messagingSenderId: "901857266087",
  appId: "1:901857266087:web:10c35c1591800882838e82"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};