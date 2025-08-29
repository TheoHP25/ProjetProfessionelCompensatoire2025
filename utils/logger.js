const fs = require('fs');
const path = require('path');

// Chemin vers le dossier des logs
const logsDirectory = path.join(__dirname, '../logs');

// vérifier que le dossier des logs existe
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

// Fonction pour écrire dans les logs
function logAction(userId, action, details = '') {
  const timestamp = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
  const logMessage = `[${timestamp}] Utilisateur ID: ${userId} | Action: ${action} | Détails: ${details}\n`;

  // Chemin vers le fichier de log
  const logFilePath = path.join(logsDirectory, 'actions.log');

  // Écrire le message de log dans le fichier
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Erreur lors de l\'écriture dans le fichier de log:', err);
    }
  });
}

module.exports = { logAction };
