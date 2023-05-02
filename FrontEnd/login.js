const button = document.getElementById("connexion")

document.querySelector("#login-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const error = document.querySelector('#error-message')

  const emailUser = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  
  const user = {
      email: emailUser, 
      password : password, 
  }

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  .then(response => {
    if (response.ok) {
      return response.json()
        .then(data => {
          const { userId, token } = data;
            // Stocker l'ID utilisateur et le jeton d'authentification localement
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        // Rediriger l'utilisateur vers la page suivante
        window.location.replace("index.html");
      })
        
    } else if (response.status === 404){
      error.innerHTML = "erreur dans l'identifiant" ;
    } else if (response.status === 401){
      error.innerHTML = "erreur mot de passe" ;
    } 
  })
  });






// Récupérer le token depuis le stockage local
const token = localStorage.getItem("token");


// Envoyer une requête au serveur pour vérifier si l'utilisateur est connecté
fetch("http://localhost:5678/api/users/check", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(response => {
  const buttonFilter = document.getElementById('buttonFilter')
  if (response.ok) {
    buttonFilter.style.opacity = 0;
  } 
});



  // Vérifier si l'utilisateur est connecté
if (localStorage.getItem("token")) {
 
  // Afficher logout à la place de login 
  const connexionLOGOUT = document.getElementById("verbes");
  connexionLOGOUT.innerHTML = "Logout";

} else {
  const connexionLOGIN = document.getElementById("verbes");
  connexionLOGIN.innerHTML = "Login";

}

const buttonFilter = document.getElementById('buttonFilter')

if (localStorage.getItem("token")) {
 buttonFilter.style.opacity = 0;
}