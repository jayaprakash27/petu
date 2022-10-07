import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCNgktRdPNL-RU7QXBmb2Swdo0mi-Walro",
    authDomain: "petu-68f8e.firebaseapp.com",
    databaseURL: "https://petu-68f8e-default-rtdb.firebaseio.com",
    projectId: "petu-68f8e",
    storageBucket: "petu-68f8e.appspot.com",
    messagingSenderId: "679947990318",
    appId: "1:679947990318:web:c1876dbe8df4f18fb036bf"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export { app, firestore, storage };
