const firebaseConfig = {
  apiKey: "AIzaSyDAYfLYUiPRo6pZaGq12aik5FHAUZlbaOs",
  authDomain: "gcci-4e8c0.firebaseapp.com",
  projectId: "gcci-4e8c0",
  storageBucket: "gcci-4e8c0.appspot.com",
  messagingSenderId: "617147871883",
  appId: "1:617147871883:web:700cecbd321ef6cfd05a8e",
  measurementId: "G-005613LV4Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
