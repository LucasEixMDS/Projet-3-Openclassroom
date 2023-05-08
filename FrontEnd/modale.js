const galleryContainer = document.getElementById('galleryContainer');

const deleteProject = (projectId) => {
    fetch(`http://localhost:5678/api/works/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de la requête.');
      }
      console.log('Projet supprimé avec succès !');
      const figureToDelete = document.getElementById(projectId); // Trouver l'élément HTML correspondant au projet
    if (figureToDelete) {
      // Supprimer l'élément HTML du DOM dans index.js
      figureToDelete.remove();
    }
    const modalFigureToDelete = document.getElementById(projectId); // Trouver l'élément HTML correspondant au projet dans modal.js
    if (modalFigureToDelete) {
      // Supprimer l'élément HTML du DOM dans modal.js
      modalFigureToDelete.remove();
    }
    })
    .catch(error => {
      console.error('Erreur :', error);
    });
  }
  

  function displayGalerie(data) {
    data.forEach((project) => {
     
        const figure = document.createElement("figure");
        figure.id = project.id; // Ajouter l'ID unique comme ID pour l'élément HTML
        const image = document.createElement("img");
        const titre = document.createElement("a");
        const deleteButton = document.createElement("button")
        const trashIMG = document.createElement("img")
  
        image.src = project.imageUrl;
        titre.textContent = "éditer";
        deleteButton.className="deleteBTN"
        deleteButton.value=project.id;
        deleteButton.addEventListener('click', () => {
            deleteProject(project.id);
        });
        trashIMG.id="deleteIMG";
        trashIMG.src="assets/icons/supprimer.png";
  
        figure.appendChild(image);
        figure.appendChild(titre);
        figure.appendChild(deleteButton);
        deleteButton.appendChild(trashIMG);
        galleryContainer.appendChild(figure);
  
    });
  }
  
  
  // utilisation de fetch pour recuperer les projets via l'API
  fetch("http://localhost:5678/api/works")
    // response.json car fichier api en json
    .then((Response) => Response.json())
    .then((data) => {
      //utilisation de foreach pour faire une boucle et avoir plusieurs projets
      displayGalerie(data);
    });


const titleInput = document.querySelector('input[name="titre"]');
const categoryInput = document.querySelector('input[name="categorie"]');
const imageInput = document.querySelector('input[name="image"]');

const myButton = document.getElementById('submitProject');
console.log(myButton); // Vérifier que l'élément est sélectionné
myButton.addEventListener('click', () => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('title', titleInput.value);
  formData.append('category', categoryInput.value);
  formData.append('image', imageInput.files[0]);

  fetch("http://localhost:5678/api/works", {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Une erreur est survenue lors de la requête.');
    }
    return response.json();
  })
  .then(data => {
    console.log('Image ajoutée avec succès :', data);
    // Réinitialiser le formulaire ou faire autre chose après l'ajout de l'image
  })
  .catch(error => {
    console.error('Erreur :', error);
  });
});

