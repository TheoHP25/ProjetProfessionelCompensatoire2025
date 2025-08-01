document.addEventListener('DOMContentLoaded', async function() {
  // Charger et afficher les utilisateurs
  await loadUsers();

  // Charger et afficher les journaux
  await loadLogs();
});

async function loadUsers() {
  try {
    const response = await fetch('/admin/users');
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
    document.getElementById('users').innerHTML = '<p>Erreur lors du chargement des utilisateurs.</p>';
  }
}

async function loadLogs() {
  try {
    const response = await fetch('/admin/logs');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des journaux');
    }
    const logs = await response.json();
    const logsDiv = document.getElementById('logs');
    logsDiv.innerHTML = logs.map(log => `
      <div>
        <p>Utilisateur ID: ${log.utilisateur_id}</p>
        <p>Action: ${log.action}</p>
        <p>Date: ${new Date(log.date_action).toLocaleString()}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Erreur:', error);
    document.getElementById('logs').innerHTML = '<p>Erreur lors du chargement des journaux.</p>';
  }
}

async function updateUserRole(userId, newRole) {
  try {
    const response = await fetch(`/admin/users/${userId}/role`, {
      method: 'PATCH',
      headers: {
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
    alert('Erreur lors de la mise à jour du rôle.');
  }
}
