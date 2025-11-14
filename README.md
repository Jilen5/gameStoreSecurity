# Projet gameStore 

Ce projet a pour but de créer une API Game Store pour gérer les jeux, les utilisateurs et leurs profils, les catégories et les commentaires des utilisateurs. Cette API doit être sécurisée, documentée et doit utiliser un modèle MVC avec de la POO.

## Technologies utilisées

- Node.js
- PostgreSQL
- MongoDB
- Postman, Jest et Supertest
- Swagger

### Dépendances utilisées

- express
- dotenv
- pg
- mongoose
- cors
- jsonwebtoken
- bcrypt
- express-rate-limit
- jest
- supertest
- swagger-ui-express
- swagger-jsdoc

## Installation

### Prérequis:

- Node.js
- PostgreSQL => Créer une base de dev et une base de test vides
- MongoDB => Créer une base de dev et une base de test vides

Cloner le repo: 
- `git clone https://github.com/nathanremond/gameStore`

Installer les dépendances:
- `cd gameStore`
- `npm install`

## Configuration

.env: Fichier contenant les variables d'environnements des bases de developpement.

.env.test: Fichier contenant les variables d'environnements des bases de test.

#### Variables d'environnements de .env et .env.test:

NODE_ENV=test (uniquement pour le fichier .env.test)

PGUSER= nom de l'utilisateur postgreSQL

PGHOST= localhost

PGDATABASE= nom de la DB de dev ou de test

PGPASSWORD= mot de passe de l'utilisateur postgreSQL

PGPORT=5432

MONGO_URI= mongodb://127.0.0.1:27017/nom de la DB de dev ou de test

MONGO_DBNAME= nom de la DB de dev ou de test

JWT_SECRET= Token secret (au choix)

PORT=3000

## Lancer le projet

#### Mode développement

- `npm run dev`

#### Mode test

- `npm run test_API`

## Documentation de l'API

#### Routes principales

- /api/auth
- /api/users
- /api/games
- /api/comments
- /api/categories
- /api/profiles

Chaque CRUD contient:

- GET / => 200
- GET /:id => 200
- POST / => 201
- PUT /:id => 200
- DELETE /:id => 204

à l'exception de /api/auth:

- POST /register => 201
- POST /login => 200

Documentation Swagger disponible:

- `http://localhost:3000/docs`

## Tests

Les tests s'appliquent aux bases de tests seulement si les fichiers .env et .env.test sont correctement remplis.

Lancer les tests jest / supertest:

- `npm run test`

Une collection postman se trouve dans le dossier exports.

## Sécurité

- Middleware Auth: Gère la connexion d'un utilisateur.
- Middleware Errors: Permet une gestion d'erreurs centralisée ainsi que des erreurs plus compréhensible. Permet de ne pas montrer les erreurs aux utilisateurs.
- Middleware Roles: Vérifie si un utilisateur possède un certain requis pour certaines routes.
- Hashage des mots de passes des utilisateurs lors de leur création.
- Ajout de CORS pour que les requêtes fonctionnent.
- Ajout d'un rate limiter pour éviter une surcharge de requêtes (désactivé pour les tests)