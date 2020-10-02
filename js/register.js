document.addEventListener('DOMContentLoaded', function() {
    const db = firebase.firestore();
    const register = document.getElementById('register');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const first = document.getElementById('first');
    const last = document.getElementById('last');

    
    register.addEventListener('click', function(event) {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(function(data) {
        var user = firebase.auth().currentUser;
        console.log(user.uid);
        createUser(user.uid, first.value, last.value, email.value);
        })
        .catch(function(error) {
        console.log(error.message);
        });
    });

    function createUser(uid, first, last, email) {
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
