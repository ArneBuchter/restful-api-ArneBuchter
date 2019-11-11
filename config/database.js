const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyCN8alM0M9ZIcSsmgg4Lmi6LwKB8dCzHMI",
    authDomain: "briansostebutikarne.firebaseapp.com",
    databaseURL: "https://briansostebutikarne.firebaseio.com",
    projectId: "briansostebutikarne",
    storageBucket: "briansostebutikarne.appspot.com",
    messagingSenderId: "902730866318",
    appId: "1:902730866318:web:1278bb6d5e5e2a611273df"
  };

  const db = firebase.initializeApp(firebaseConfig);

  module.exports = db;