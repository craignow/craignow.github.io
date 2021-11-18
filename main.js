'use strict'

const $ = document.querySelector.bind(document);



function createComment( commentDoc ){
    var div = document.createElement('div');
    div.innerText = commentDoc.comment;
    $('#comments').appendChild(div);
    div.className = 'comment';
}


window.onload = function(){
    

    // check if user is logged in
    onLogin( user => {
        $('.error').style.display = 'none';
        if(user){
            //user just logged in
            $('#addCommentDiv').style.display = 'block';
            $('#loginDiv').style.display = 'none';
            $('#signupDiv').style.display = 'none';
        }else{
            //user just logged out
            $('#loginDiv').style.display = 'block';
            $('#addCommentDiv').style.display = 'none';
        }
    });

    //show comments
    forEachComment( createComment );

    ////////////////////////////////
    // button and link functionality
    $('#loginLink').onclick = function(){
        $('.error').style.display = 'none';
        $('#loginDiv').style.display = 'block';
        $('#signupDiv').style.display = 'none';
    }

    $('#signupLink').onclick = function(){
        $('.error').style.display = 'none';
        $('#loginDiv').style.display = 'none';
        $('#signupDiv').style.display = 'block';
    }

    $('#slattbratha').onclick = function(){
        logout();
    }

    $('#loginBtn').onclick = function(){
        login( $('#email').value, $('#password').value )
        .catch( err => $('.error').innerText = err.message );
    }

    $('#registerBtn').onclick = function(){
        signup( $('#emailReg').value, $('#passwordReg').value )
        .catch( err => $('.error').innerText = err.message );
    }

    $('#addCommentBtn').onclick = function(){
        addComment( $('#newComment').value )
        .then( () => {
            createComment({comment: $('#newComment').value});
            $('#newComment').value = '';
        })
        .catch( err => $('.error').innerText = err.message )
    }

}