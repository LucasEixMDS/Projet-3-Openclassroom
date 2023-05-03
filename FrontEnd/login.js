const button = document.getElementById("connexion")
const form = document.querySelector("#login-form")


form.addEventListener("submit", function (event) {
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
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("token", token);
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



