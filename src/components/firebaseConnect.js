import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyAXuEWS1uIPKWrjNuldPkebPOq2TcT0uWs",
    authDomain: "notereact-2919d.firebaseapp.com",
    databaseURL: "https://notereact-2919d-default-rtdb.firebaseio.com",
    projectId: "notereact-2919d",
    storageBucket: "notereact-2919d.appspot.com",
    messagingSenderId: "1043694635090",
    appId: "1:1043694635090:web:359da074ada61bfa94778b",
    measurementId: "G-M9PQX1ZFRP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export const noteData =  firebase.database().ref('dataForNote');