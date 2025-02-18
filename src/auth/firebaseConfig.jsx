import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC-Bg_NW-CipZs_jug7Tp-bWNm_6e4MOOE',
    authDomain: 'vinyldreams-vb.firebaseapp.com',
    projectId: 'vinyldreams-vb',
    storageBucket: 'vinyldreams-vb.firebasestorage.app',
    messagingSenderId: '733838094369',
    appId: '1:733838094369:web:4da956eb01d17a87af7360',
    measurementId: 'G-V0P4HZWN3V'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
