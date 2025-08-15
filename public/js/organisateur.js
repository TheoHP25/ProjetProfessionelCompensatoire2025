document.addEventListener('DOMContentLoaded', function() {
  // Soumission du formulaire de création d'événement
  document.getElementById('createEventForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const titre = document.getElementById('titre').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const lieu = document.getElementById('lieu').value;

    try {
      const response = await fetch('/organisateur/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titre, description, date, lieu })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'événement');
      }

      const event = await response.json();
      alert('Événement créé avec succès!');
      window.location.reload();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création de l\'événement.');
    }
  });
});
