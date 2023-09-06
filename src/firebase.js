import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // YOUR CONFIG HERE
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;