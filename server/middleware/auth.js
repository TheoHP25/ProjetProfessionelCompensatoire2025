const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token JWT et les rôles
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    // Récupérer le token depuis l'en-tête Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Vérifier si le token est présent
    if (!token) {
      return res.status(401).send('Accès refusé. Aucun token fourni.');
    }

    try {
      // Vérifier le token
      const decoded = jwt.verify(token, 'ton_secret');
      req.user = decoded;

      // Vérifier si l'utilisateur a le bon rôle
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).send('Accès refusé. Rôle non autorisé.');
      }

      // Passer à la suite si tout est correct
      next();
    } catch (error) {
      res.status(400).send('Token invalide.');
    }
  };
};

module.exports = authMiddleware;
