# Vue-Firebase Real-time Chat

A real-time chat application built with Vue.js and Firebase.

## Getting Started

1. **Clone the repository:**
   ```shell
   git clone https://github.com/sinnedpenguin/vue-firebase-real-time-chat

2. **Install the necessary dependencies**:
   ```shell
   npm install

3. **Create your [Firebase](https://console.firebase.google.com/) project.**
   - Set up a web app for your project.
   - Create a Firestore database.

5. **Configure Firebase in your project:**
   - Replace the Firebase configuration object in the `firebase.js` file with the one you obtained from your Firebase project.
   ```shell
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
      // YOUR CONFIG HERE
    };

   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

   export default db;

6. **Run the application:**
   ```shell
   npm run serve
