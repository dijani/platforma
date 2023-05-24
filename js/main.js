const firebaseConfig = {
    apiKey: "AIzaSyB4nYftYzqR2f5nv5UzWvtUhHYPKcy6aSY",
    authDomain: "cursuri-b498a.firebaseapp.com",
    projectId: "cursuri-b498a",
    storageBucket: "cursuri-b498a.appspot.com",
    messagingSenderId: "968338083541",
    appId: "1:968338083541:web:3801054e9905a850715c5c",
    measurementId: "G-BP0NTLCS6G"
};

const postareBtn = document.getElementById("postare-btn");
const admin = "Xct2ZfM9IgST9XSfKIat9cNmcQv2";

//initializarea serviciului firebase
firebase.initializeApp(firebaseConfig);

//referire la serviciul de autentificare
const auth = firebase.auth();

//referinta la baza de date
const db = firebase.firestore();

//referinta la colectia din firebase
const temeDb = db.collection("teme");

let user = null;

const yearElement = document.getElementById('year');

if (yearElement) {
    let date = new Date();

    yearElement.innerHTML = date.getFullYear() + " ©";
}

function mobileMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className = "mobile";
    } else {
        x.className = "";
    }
}

function refresh() {
    window.location.reload();
}

function isAdmin() {
    if (user == null) {
        return false;
    } 

    return user.uid == admin;
}

auth.onAuthStateChanged(function(fuser){
    user = fuser;
    if (isAdmin()) {
        postareBtn.style.display = "block";
    }
    else {
        postareBtn.style.display = "none";
    }

    document.querySelector("body").style.display = "block";
});

function formatData(stamp) {
    let data = new Date(stamp);
    let an = data.getFullYear();
    let luna = data.getMonth() + 1;
    let zi = data.getDate();
    return zi + "/" + luna + "/" + an;
}