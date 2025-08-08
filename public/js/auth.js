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

    // Redirige l'utilisateur vers la page d'administration ou une autre page sécurisée
    window.location.href = '/admin/dashboard';
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors de la connexion.');
  }
}
