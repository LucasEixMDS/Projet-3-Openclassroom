// const pour intégrer dans mon html les projets
const affiche = document.querySelector(".gallery");
console.log(sessionStorage.getItem("token"));

function displayProject(data, filtre = null) {
  data.forEach((project) => {
    if (project.category.id == filtre || filtre == null) {
      // mes 3 const, figure pour la forme, img pour recuperer l'image, titre le titre
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      const titre = document.createElement("figcaption");

      // chemin pour recuperer dans l'api l'image et le titre
      image.src = project.imageUrl;
      titre.textContent = project.title;
      figure.id = project.id; // Ajouter l'ID unique comme ID pour l'élément HTML

      // utilisation de appenchild pour que mes projets
      // s'affiche bien les un à la suite des autres
      // dans le bonne ordre
      figure.appendChild(image);
      figure.appendChild(titre);
      affiche.appendChild(figure);
    }
  });
}

// utilisation de fetch pour recuperer les projets via l'API
fetch("http://localhost:5678/api/works")
  // response.json car fichier api en json
  .then((Response) => Response.json())
  .then((data) => {
    //utilisation de foreach pour faire une boucle et avoir plusieurs projets
    displayProject(data);
  });

// filtre des buttons au clique, premier button --> afficher tous les projets

const buttonTous = document.getElementById("buttonTous");
buttonTous.addEventListener("click", function () {
  affiche.innerHTML = "";
  fetch("http://localhost:5678/api/works")
    .then((Response) => Response.json())
    .then((data) => {
      //utilisation de foreach pour faire une boucle et avoir plusieurs projets
      displayProject(data);
    });
});

// filtre des buttons au clique,  button 2 --> afficher les objets

const buttonObjets = document.getElementById("buttonObjets");
buttonObjets.addEventListener("click", function () {
  affiche.innerHTML = "";
  fetch("http://localhost:5678/api/works")
    .then((Response) => Response.json())
    .then((data) => {
      //utilisation de foreach pour faire une boucle et avoir plusieurs projets
      displayProject(data, 1);
    });
});

// filtre des buttons au clique,  button 3 --> afficher les appartements

const buttonApparts = document.getElementById("buttonApparts");
buttonApparts.addEventListener("click", function () {
  affiche.innerHTML = "";
  fetch("http://localhost:5678/api/works")
    .then((Response) => Response.json())
    .then((data) => {
      //utilisation de foreach pour faire une boucle et avoir plusieurs projets
      displayProject(data, 2);
    });
});

// filtre des buttons au clique,  button 4 --> afficher les hotels et restaurants

const buttonHotel = document.getElementById("buttonHotel");
buttonHotel.addEventListener("click", function () {
  affiche.innerHTML = "";
  fetch("http://localhost:5678/api/works")
    .then((Response) => Response.json())
    .then((data) => {
      displayProject(data, 3);
    });
});

const buttonFilter = document.getElementById("buttonFilter");
const buttonLogout = document.querySelector(".btn-logout");
const buttonLogin = document.querySelector(".btn-login");
const blackHeader = document.getElementById("blackHeader");
const changeColor = document.getElementById("changeColor");
const mesProjets = document.querySelector(".projetModif");
const ButtonModif = document.querySelectorAll(
  ".buttonEdition, .btn-edit, #buttonModification, #buttonModif, #buttonModification2"
);
const ModifCacher = document.querySelector(".projetModifCacher");
const overlay = document.getElementById("overlay");

if (
  sessionStorage.getItem("token") !== null &&
  sessionStorage.getItem("token") !== ""
) {
  buttonFilter.style.opacity = 0;
  buttonLogout.style.display = "block";
  buttonLogin.style.display = "none";
} else {
  blackHeader.style.display = "none";
  changeColor.style.display = "none";
  ButtonModif.forEach((button) => {
    button.style.display = "none";
  });
  mesProjets.style.marginLeft = "0px";
  mesProjets.style.marginTop = "126px";
  buttonFilter.style.marginBottom = "20px";
}

ButtonModif.forEach((button) => {
  button.addEventListener("click", () => {
    ModifCacher.style.opacity = 1;
    ModifCacher.style.visibility = "visible";
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    overlay.style.display = "flex";
  });
});

const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", () => {
  ModifCacher.style.opacity = 0;
  ModifCacher.style.visibility = "hidden";
  overlay.style.visibility = "hidden";
  overlay.style.opacity = "0";
  overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
  ModifCacher.style.opacity = 0;
  ModifCacher.style.visibility = "hidden";
  overlay.style.visibility = "hidden";
  overlay.style.opacity = "0";
  overlay.style.display = "none";
});
