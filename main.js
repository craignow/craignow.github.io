'use strict'

const $ = document.querySelector.bind(document);



function createComment( commentDoc, ID ){
    var div = document.createElement('div');
    
    div.innerText = commentDoc.username+": ";
    var text = div.appendChild(document.createElement('span'));
    text.innerText = commentDoc.comment+" ("+commentDoc.createdon.toDate()+")";
    $('#comments').appendChild(div);
    console.log(window.username, commentDoc);
    if(commentDoc.username==window.username)
    {
        var button = div.appendChild(document.createElement('button'));
        var deleteText = div.appendChild(document.createElement('button'));
        button.innerText = "edit";
        deleteText.innerText = "delete";
        button.onclick = function(){
            var message = prompt("new message");
            if(message)
            {
            text.innerText = message+" (edited)";
            updateMessage(ID, message);
            }
        }
        deleteText.onclick = function()
        {
            deleteMessage(ID);
            div.remove();
        }

    }
    div.className = 'comment';
}


window.onload = function(){
    

    // check if user is logged in
    onLogin( user => {
        $('.error').style.display = 'none';
        if(user){
            //user just logged in

            getUser()
            .then( u => {
                window.username = u.data().username;

            // window.username = (await window.getUser()).data().username;
                $('#addCommentDiv').style.display = 'block';
                $('#loginDiv').style.display = 'none';
                 $('#signupDiv').style.display = 'none';
            
     //show comments
            forEachComment( createComment );
            });
        }else{
            //user just logged out
            $('#loginDiv').style.display = 'block';
            $('#addCommentDiv').style.display = 'none';
        }
    });

   

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
        signup( $('#emailReg').value, $('#userReg').value, $('#passwordReg').value )
        .catch( err => $('.error').innerText = err.message );
    }

    $('#addCommentBtn').onclick = function(){
        addComment( $('#newComment').value )
        .then( (ID) => {
            createComment( {comment: $('#newComment').value, user: username}, ID );
            $('#newComment').value = '';
        })
        .catch( err => $('.error').innerText = err.message )
    }

}