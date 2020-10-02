document.addEventListener('DOMContentLoaded', function() {
    const db = firebase.firestore();
    // let _user = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            getUsers(user);
        } else {
            console.log("no user");
            //- window.location = 'login';
        }
    });

    function getUsers(user) {
        db.collection('Users')
            .doc(user.uid)
            .get()
            .then(function(doc) {
                if (doc.exists) {
                    //- console.log("document data: " + doc.data().lastname);
                    var firstName = doc.data().firstname;
                    var lastName = doc.data().lastname;
                    helloUser(firstName);
                } else {
                    console.log('No such document!');
                }
            })
            .catch(function(error) {
                console.log("error getting document: ", error)
            });
    }

    function helloUser(firstName) {
        var welcome = document.getElementById('welcome');

        welcome.innerHTML = "Welcome, " + firstName + "!"
    }
});