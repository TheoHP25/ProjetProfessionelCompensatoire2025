const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Token reçu:', token); // Ajoute ce log pour vérifier le token reçu

    if (!token) {
      console.log('Aucun token fourni dans les en-têtes');
      return res.status(401).send('Accès refusé. Aucun token fourni.');
    }

    try {
      const decoded = jwt.verify(token, 'ton_secret');
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).send('Accès refusé. Rôle non autorisé.');
      }

      next();
    } catch (error) {
      console.error('Erreur de vérification du token:', error);
      res.status(400).send('Token invalide.');
    }
  };
};

module.exports = authMiddleware;
