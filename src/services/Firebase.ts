import { initializeApp } from 'firebase/app';

// noinspection SpellCheckingInspection
const firebaseConfig = {
    apiKey: "AIzaSyBQ5CPz2SDIwEj_yEDThT6zTjdmwvji7sI",
    authDomain: "macaron-website-dev.firebaseapp.com",
    projectId: "macaron-website-dev",
    storageBucket: "macaron-website-dev.appspot.com",
    messagingSenderId: "539801592822",
    appId: "1:539801592822:web:26fa54b2d82888e4ec1dd7",
    measurementId: "G-YYWCLYNQE2"
}

export const app = initializeApp(firebaseConfig);
