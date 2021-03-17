var firebaseConfig = {
    apiKey: "AIzaSyDIEQa-u1k08E07mFldJSMKh-sbSosbZw0",
    authDomain: "gcci-english-ministry.firebaseapp.com",
    projectId: "gcci-english-ministry",
    storageBucket: "gcci-english-ministry.appspot.com",
    messagingSenderId: "490201486285",
    appId: "1:490201486285:web:dab49f2618c95569ef2a84",
    measurementId: "G-RL0Z0SGTWW"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
