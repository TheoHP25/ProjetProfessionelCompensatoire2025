const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).send('Accès refusé. Aucun token fourni.');
    }

    try {
      const decoded = jwt.verify(token, 'ton_secret');
      req.user = decoded;

      // Vérifie si l'utilisateur a le rôle requis
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
