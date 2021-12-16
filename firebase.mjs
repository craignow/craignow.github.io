// our firebase file


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore, addDoc, setDoc, getDoc, doc, updateDoc, getDocs, collection, serverTimestamp, deleteDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";



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
const userCollection = collection(db, "users");


//////////////////////////////////////////////
// exposed functionality for auth
window.login = function(email,password){
    
    return signInWithEmailAndPassword(auth, email, password);

}

window.signup = function(email, displayId, password){
    console.log(email, displayId, password);
    return createUserWithEmailAndPassword(auth, email, password)
    .then(()=>addUser(displayId, email));
}

window.logout = function(){
    auth.signOut();
}

window.onLogin = function( f ){
    onAuthStateChanged(auth, user => {
        
        f( user );
    });
}
window.saveUser = function(display, userId, pass){
    var dbUser = getDocs(userCollection)
    .doc(userId).set(
        {
            email: userId,
            displayName: display,
            password: pass
        }
    );
   return addDoc(userCollection, dbUser);
}


//////////////////////////////////////////////
// exposed functionality for db
window.addComment = function(comment){
    console.log(comment);
    return addDoc( q, {username: window.username, comment, createdon: serverTimestamp()} );
    
}

window.forEachComment = async function( f ){
    //var docs = await getDocs( commentsCollection );
    const q = query(commentsCollection, orderBy("createdon"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach( doc => f(doc.data(), doc.id) );
}

window.addUser = function(displayId, email)
{
setDoc(doc(db, "users", email),
{email: email, username: displayId})}

window.getUser = function()
{
    return getDoc(doc(db, "users", auth.currentUser.email));
}

window.updateMessage = function(messageID, newMessage)
{
    var newDoc = doc(db, "comments", messageID);
    updateDoc(newDoc, {
        comment: newMessage+" (edited)"
    });

}

window.deleteMessage = function(messageID)
{
    deleteDoc(doc(db, "comments", messageID));
}