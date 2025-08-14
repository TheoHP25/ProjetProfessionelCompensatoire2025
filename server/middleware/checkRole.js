const checkRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).send('Accès refusé. Vous devez être connecté.');
    }

    if (roles.length && !roles.includes(req.session.user.role)) {
      return res.status(403).send('Accès refusé. Rôle non autorisé.');
    }

    next();
  };
};

module.exports = checkRole;
