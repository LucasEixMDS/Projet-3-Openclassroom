function logout(){

    const buttonLogout = document.querySelector(".btn-logout");

    buttonLogout.addEventListener("click", function () {
    // Supprimer le token et l'ID utilisateur du localStorage
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    // Rediriger l'utilisateur vers la page de connexion
    window.location.replace("./login.html");
    });
}