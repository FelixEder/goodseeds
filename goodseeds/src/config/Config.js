import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyArI_y1u-tJfEdyqd7LCiGFYURlPoIhSYs",
  authDomain: "goodseeds-6ae68.firebaseapp.com",
  databaseURL: "https://goodseeds-6ae68.firebaseio.com",
  projectId: "goodseeds-6ae68",
  storageBucket: "goodseeds-6ae68.appspot.com",
  messagingSenderId: "301062964499",
  appId: "1:301062964499:web:be2fde589f5ad4cc4e06e6",
  measurementId: "G-KKC8JCMPVR"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;