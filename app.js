var bodyParser = require('body-parser'); //Express initializes express to be a function handler that you can supply to an HTTP server 
var express = require('express'); //Express initializes express to be a function handler that you can supply to an HTTP server 
const http = require("http");

var pug = require('pug');
var firebase = require('firebase');
var admin = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json')

var app = express();
let httpServer = http.createServer(app)

var firebaseConfig = {
  apiKey: "YOURAPIKEY",
  authDomain: "matchgame-bfb00.firebaseapp.com",
  databaseURL: "https://matchgame-bfb00.firebaseio.com",
  projectId: "matchgame-bfb00",
  storageBucket: "matchgame-bfb00.appspot.com",
  messagingSenderId: "1081556143933",
  appId: "1:1081556143933:web:0b2b51797425f6d5c8bf54",
  measurementId: "G-CN2C9ME7GV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//initialize firebase admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://matchgame-bfb00.firebaseio.com"
});

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('assets'));

app.get('/', (req, res) => { //We define a route handler '/' that gets called when we hit our website home
    res.render('index'); //homepage
});

app.get('/login', (req, res) => { //We define a route handler '/' that gets called when we hit our website home
    res.render('login'); //login
});

app.get('/logout', (req, res) => { //We define a route handler '/' that gets called when we hit our website home
  res.render('logout'); //logout
});

app.get('/register', (req, res) => { //We define a route handler '/' that gets called when we hit our website home
  res.render('register'); //register
});

app.get('/game', (req, res) => { //We define a route handler '/' that gets called when we hit our website home
  res.render( 'game');
});

httpServer.listen(process.env.PORT || 3000, function () {
  console.log("SERVER STARTED PORT: 3000");
});
