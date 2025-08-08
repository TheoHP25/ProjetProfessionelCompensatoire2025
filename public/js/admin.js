// Fonction pour vérifier si le token est expiré
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    return true;
  }
}

async function fetchUsers() {
  try {
    // Récupère le token depuis le localStorage
    const token = localStorage.getItem('token');

    if (!token || isTokenExpired(token)) {
      throw new Error('Token expiré ou non trouvé. Veuillez vous reconnecter.');
    }

    const response = await fetch('/admin/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }

    const users = await response.json();
    const usersDiv = document.getElementById('users');
    usersDiv.innerHTML = users.map(user => `
      <div>
        <h2>${user.nom}</h2>
        <p>Email: ${user.email}</p>
        <p>Rôle: ${user.role}</p>
        <select onchange="updateUserRole(${user.id}, this.value)">
          <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
          <option value="organisateur" ${user.role === 'organisateur' ? 'selected' : ''}>Organisateur</option>
          <option value="etudiant" ${user.role === 'etudiant' ? 'selected' : ''}>Étudiant</option>
        </select>
      </div>
    `).join('');
  } catch (error) {
    console.error('Erreur:', error);
    alert('Veuillez vous reconnecter.');
    window.location.href = '/'; // Redirige vers la page de connexion
  }
}

async function updateUserRole(userId, newRole) {
  try {
    const token = localStorage.getItem('token');

    if (!token || isTokenExpired(token)) {
      throw new Error('Token expiré ou non trouvé. Veuillez vous reconnecter.');
    }

    const response = await fetch(`/admin/users/${userId}/role`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: newRole }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du rôle');
    }

    const updatedUser = await response.json();
    console.log('Rôle mis à jour avec succès:', updatedUser);
    alert('Rôle mis à jour avec succès!');
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle:', error);
    alert('Erreur lors de la mise à jour du rôle. Veuillez vous reconnecter.');
    window.location.href = '/'; // Redirige vers la page de connexion
  }
}

// Charger les utilisateurs au chargement de la page
document.addEventListener('DOMContentLoaded', fetchUsers);
