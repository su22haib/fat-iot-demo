import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAUUtBM4_cSN30dHrJzft_2CphUX9dvvU0",
  authDomain: "remote-monitoring-system-1b1d1.firebaseapp.com",
  databaseURL: "https://remote-monitoring-system-1b1d1-default-rtdb.firebaseio.com",
  projectId: "remote-monitoring-system-1b1d1",
  storageBucket: "remote-monitoring-system-1b1d1.appspot.com",
  messagingSenderId: "583278818217",
  appId: "1:583278818217:web:0ae883931c6beff73ecab8",
  measurementId: "G-GBTK8GWH1T"
};

const Firebase = firebase.initializeApp(config);
export default Firebase;