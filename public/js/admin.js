// Supposons que tu aies récupéré le rôle de l'utilisateur et stocké dans une variable `userRole`
const userRole = 'admin'; // Cela devrait venir de ton système d'authentification

if (userRole !== 'admin') {
  document.getElementById('admin-nav').style.display = 'none';
}

fetch('/api/utilisateurs')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Affiche les données des utilisateurs
  })
  .catch(error => console.error('Erreur:', error));
