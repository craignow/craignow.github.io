// our firebase file


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore, addDoc, getDocs, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBr_oOzUnDci2oumCeyZG7c3HglY1zeTyo",

    authDomain: "dogg-11f9d.firebaseapp.com",
  
    projectId: "dogg-11f9d",
  
    storageBucket: "dogg-11f9d.appspot.com",
  
    messagingSenderId: "546251619998",
  
    appId: "1:546251619998:web:e6f665cbb6aeeea2e1058f",
  
    measurementId: "G-2BJX7C5DKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);


const commentsCollection = collection(db, "comments");

//////////////////////////////////////////////
// exposed functionality for auth
window.login = function(email,password){
    return signInWithEmailAndPassword(auth, email, password);
}

window.signup = function(email,password){
    return createUserWithEmailAndPassword(auth, email, password);
}

window.logout = function(){
    auth.signOut();
}

window.onLogin = function( f ){
    onAuthStateChanged(auth, user => {
        f( user );
    });
}


//////////////////////////////////////////////
// exposed functionality for db
window.addComment = function(comment){
    return addDoc( commentsCollection, {comment, createdon: serverTimestamp} );
}

window.forEachComment = async function( f ){
    var docs = await getDocs( commentsCollection );
    console.log(docs);
    docs.forEach( doc => f(doc.data()) );
}
