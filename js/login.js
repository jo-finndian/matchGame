window.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('login');

    //sign-in with email and password
    form.addEventListener('click', function() {
        var email = document.getElementById('email');
        var password = document.getElementById('password');

        firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(function(data) {
            const user = firebase.auth().currentUser;
            console.log("hello");
            authState(user);
        })
        .catch(function(error) {
            console.log(error.message);
        });
    });

    function authState(user) {
        firebase.auth().onAuthStateChanged(function(user) {
        if (user != null) {
            window.location = '/game';
        }
        else {
            alert("Please try signing in again.");
        }
        });
    }


    const loginGoogle = document.getElementById('loginGoogle');

    //sign-in with google
    loginGoogle.addEventListener('click', function() {
        const db = firebase.firestore();
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user != null) {
            console.log(user.displayName);
            addUser(user.uid, user.displayName.split(' ').slice(0, -1).join(' '), user.displayName.split(' ').slice(-1).join(' '), user.email);
            }
        });
        })
        .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        console.log(errorMessage);
        });

        function addUser(uid, first, last, email) {
        db.collection('Users')
            .doc(uid)
            .set({
            firstname: first,
            lastname: last,
            email: email,
            user: uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(function() {
            console.log('Document written');
            window.location = '/game';
            })
            .catch(function(error) {
            console.error('Error adding document: ', error);
            });
        }
    });
});
