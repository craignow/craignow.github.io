// our firebase file


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore, addDoc, getDocs, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";



// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyCuXa_AEYd_ry48ztkZ2vVfcBJZk-6QF1s",

    authDomain: "dogg2-86976.firebaseapp.com",

    projectId: "dogg2-86976",

    storageBucket: "dogg2-86976.appspot.com",

    messagingSenderId: "768866044892",

    appId: "1:768866044892:web:fc27fbd1ecae3e42d95d19",

    measurementId: "G-N1VDLK6PH5"

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

window.signup = function(email, user, password){
    return createUserWithEmailAndPassword(auth, email, user, password);
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
    return addDoc( commentsCollection, {user, comment, createdon: serverTimestamp()} );
}

window.forEachComment = async function( f ){
    var docs = await getDocs( commentsCollection );
    console.log(docs);
    docs.forEach( doc => f(doc.data()) );
}
