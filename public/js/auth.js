async function login(email, password) {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la connexion');
    }

    const data = await response.json();

    // Stocke le token dans le localStorage
    localStorage.setItem('token', data.token);

    // Redirige l'utilisateur en fonction de son rôle
    if (data.role === 'admin') {
      window.location.href = '/admin/dashboard';
    } else if (data.role === 'organisateur') {
      window.location.href = '/organisateur/dashboard';
    } else {
      window.location.href = '/'; // Redirige vers une page par défaut pour les autres rôles
    }
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors de la connexion.');
  }
}
