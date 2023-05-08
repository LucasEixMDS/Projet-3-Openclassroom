// Récupération du bouton de connexion et du formulaire de connexion
const button = document.getElementById("connexion");
const form = document.querySelector("#login-form");

// Ajout d'un écouteur d'événements sur le formulaire lorsque l'utilisateur clique sur le bouton de connexion
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche le formulaire de se soumettre à la page suivante qui recharge la page

  // Récupération de l'élément d'affichage des erreurs
  const error = document.querySelector('#error-message');

  // Récupération des valeurs saisies par l'utilisateur dans les champs email et mot de passe
  const emailUser = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  
  // Création d'un objet user contenant l'email et le mot de passe saisis par l'utilisateur
  const user = {
      email: emailUser, 
      password : password, 
  }

  // Envoi des informations de connexion à l'API serveur en utilisant la méthode POST
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  .then(response => {
    if (response.ok) {
      // Si la réponse est positive, le serveur renvoie un objet JSON contenant l'identifiant de l'utilisateur et un token d'authentification
      // Extraction de ces données depuis la réponse JSON
      return response.json()
        .then(data => {
          const { userId, token } = data;
          // Stockage de l'identifiant utilisateur et du token d'authentification localement sur le navigateur
          sessionStorage.setItem("userId", userId);
          sessionStorage.setItem("token", token);
          // Redirection de l'utilisateur vers la page suivante
          window.location.replace("index.html");
      })  
    } else if (response.status === 404){
      // Si la réponse indique une erreur 404, l'identifiant de l'utilisateur est incorrect
      error.innerHTML = "erreur dans l'identifiant" ;
    } else if (response.status === 401){
      // Si la réponse indique une erreur 401, le mot de passe est incorrect
      error.innerHTML = "erreur mot de passe" ;
    } 
  })
});



