# Utilise une image Node.js officielle comme base
FROM node:20-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers de l'application
COPY . .

# Expose le port sur lequel l'application va écouter
EXPOSE 3000

# Définit la commande pour démarrer l'application
CMD ["node", "server/index.js"]
