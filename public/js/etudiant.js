document.addEventListener('DOMContentLoaded', function() {
    console.log('Page étudiant chargée avec succès');

    // Charger les événements disponibles
    fetch('/etudiant/events')
        .then(response => response.json())
        .then(events => {
            const eventsDiv = document.getElementById('events');
            events.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'event';
                eventDiv.innerHTML = `
                    <h3>${event.titre}</h3>
                    <p>${event.description}</p>
                    <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
                    <p>Lieu: ${event.lieu}</p>
                    <button onclick="registerForEvent(${event.id})">S'inscrire</button>
                `;
                eventsDiv.appendChild(eventDiv);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des événements:', error);
        });
});

// Fonction pour s'inscrire à un événement
function registerForEvent(eventId) {
    const userId = 1; // Remplace par l'ID de l'utilisateur connecté
    fetch(`/etudiant/events/${eventId}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            // Désactiver le bouton après inscription
            const buttons = document.querySelectorAll(`button[onclick="registerForEvent(${eventId})"]`);
            buttons.forEach(button => {
                button.textContent = 'Inscrit';
                button.disabled = true;
                button.style.backgroundColor = '#cccccc';
            });
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Erreur lors de l\'inscription à l\'événement:', error);
        alert('Erreur lors de l\'inscription à l\'événement');
    });
}
