// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHgOa-ioyAjWHE9FFrO3czE2EemnMXu34",
  authDomain: "docdoc-c44ef.firebaseapp.com",
  projectId: "docdoc-c44ef",
  storageBucket: "docdoc-c44ef.appspot.com",
  messagingSenderId: "222523023886",
  appId: "1:222523023886:web:3db2b439e7557fbc17525f",
  measurementId: "G-7BNSKWJY0P",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const storage = firebase.storage();

export { auth, app, storage };
