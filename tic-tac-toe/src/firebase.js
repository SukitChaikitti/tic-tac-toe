import firebase from "firebase";


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCO6nKD0jave9vrdYoqdqao38qXCRCLMe0",
    authDomain: "tictactoe-383bb.firebaseapp.com",
    projectId: "tictactoe-383bb",
    storageBucket: "tictactoe-383bb.appspot.com",
    messagingSenderId: "725798423710",
    appId: "1:725798423710:web:42f9d885ac34d415febf8f"
  });

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export {db , auth , provider};