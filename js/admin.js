const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");

const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick = function() {
    console.log("Logare...");
    auth.signInWithPopup(provider).then(refresh);

}

logoutBtn.onclick = function() {
    auth.signOut();
}

auth.onAuthStateChanged(function(fuser) {
    user = fuser;

    if (user != null) {//suntem logati
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
    }
    else {//nu suntem logati
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
    }
})