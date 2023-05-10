
// function de deconnexion 
function logout(){

    const buttonLogout = document.querySelector(".btn-logout");

    buttonLogout.addEventListener("click", function () {
    // Supprimer le token et utilisateur du sessionStorage
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    // Rediriger l'utilisateur vers la page html 
    window.location.replace("./login.html");
    });
}