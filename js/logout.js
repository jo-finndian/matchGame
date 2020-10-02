document.addEventListener('DOMContentLoaded', function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        firebase.auth().signOut();
        } else {
        }
    });
});

setTimeout(function(){
    window.location.href = '/';
}, 500);