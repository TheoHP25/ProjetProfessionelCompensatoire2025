document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Vous devez être connecté pour accéder à cette page.');
    window.location.href = '/login';
    return;
  }

  // Exemple de requête pour récupérer les données de l'organisateur
  async function fetchOrganisateurData() {
    try {
      const response = await fetch('/organisateur/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }

      const data = await response.json();
      // Traite les données ici
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la récupération des données.');
    }
  }

  fetchOrganisateurData();
});
