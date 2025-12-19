# Projet gameStore 

Ce projet a pour but de concevoir, développer et sécuriser une application 3-tiers contenant un frontend, une API et une base de données sur la thématique du catalogue de jeux vidéo.

## Technologies utilisées

- Node.js
- Express
- JavaScript
- React
- Vite
- PostgreSQL
- MongoDB
- Postman
- Swagger
- OWASP ZAP
- SonarQube

## Installation

### Prérequis:

- Node.js
- PostgreSQL => Créer une base
- MongoDB => Créer une base

Cloner le repo: 
- `git clone https://github.com/Jilen5/gameStoreSecurity.git`

Installer les dépendances:
- `cd gameStore`
- `npm install`

## Configuration

.env: Fichier contenant les variables d'environnements des bases de developpement.

#### Variables d'environnements de .env et .env.test:

Les variables d'environnement sont listées dans le fichier .env.example à la racine du projet

PGUSER= nom de l'utilisateur postgreSQL

PGHOST= localhost

PGDATABASE= nom de la DB

PGPASSWORD= mot de passe de l'utilisateur postgreSQL

PGPORT=5432

MONGO_URI= mongodb://127.0.0.1:27017/nom de la DB

MONGO_DBNAME= nom de la DB

PORT= Le port de l'API

SESSION_SECRET= clé secrète de la session (au choix)

DATA_ENC_KEY= clé de chiffrement pour les données sensibles 
Taper `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` pour le générer

## Lancer le projet

#### Lancer l'API

- `npm run dev` à la racine du projet

#### Lancer le frontend

- `npm run dev` dans le dossier frontend

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
- POST /logout => 200

Documentation Swagger disponible:

- `https://localhost:3000/docs`

## Tests

Une collection postman se trouve dans le dossier exports.

## Sécurité

#### Broken Access Control

- Rôle requis pour accéder aux routes

Certaines routes sont inaccessibles à certains rôles et il faut être authentifié pour accéder à la plupart des routes.

#### Cryptographic failures

- Implémentation de HTTPS + HSTS avec un certificat auto signé.

Dans un terminal en administrateur:

Installer mkcert avec choco: `choco install mkcert`
Générer un CA avec mkcert: `mkcert -install`

Dans la racine du projet dans un dossier certs:

Clé privée et certificat créés avec `mkcert localhost`

Les noms des fichiers doivent être localhost-key.pem et localhost.pem

Il est préférable de lancer sur firefox car il supporte mieux les certificats auto signés.
Dans les parmaètres du navigateur, il faut trouver l'endroit où sont listés les certificats et importer la CA de mkcert à cet endroit.

La CA de mkcert se trouve dans `%LOCALAPPDATA%\mkcert`

- Données sensibles chiffrées

Le nom d'utilisateur et l'email sont chiffrés avec le module crypto natif à Node.
L'email est aussi hashé car il est nécessaire de comparer l'email dans certaines routes.

- Clé secrètes

Contenues dans le .env qui est dans le .gitignore.
Le fichier .env.example liste toutes les variables d'environnement.

#### Injections

- Injections XSS

Headers helmet X-Content-Type-Options et Content-Security-Policy.

- Validation des données

Utilisation de la dépendance JOI pour valider les données côté serveur.

- Requêtes préparées en SQL et NoSQL

Aucun paramètre mis dans les requêtes SQL et pas d'utilisation de WHERE en NoSQL.

#### Security Misconfiguration

- Headers de sécurité

Avec la dépendance helmet, configuration de plusieurs headers:

HSTS, X-Frame-Options, Referrer-Policy, Cross-Origin-Opener-Policy, Cross-Origin-Resource-Policy, Origin-Agent-Cluster

- Messages d'erreurs génériques

Middleware qui renvoit des erreurs génériques et dans les routes, les erreurs donnent le moins d'informations possibles à l'utilisateur.

- Configuration CORS

Implémentation de CORS avec la dépendance CORS.

#### Vulnerable & Outdated Components

Utilisation de npm outdated, npm audit et de packagist pour repérer les dependances et framework qui doivent être migrés ou qui sont obsolètes.

#### Identification & Authentication Failures

- Rate limiter

Implémentation de rate limiter avec la dépendance express-rate-limit pour empêcher le brute force.

Deux rate limiter définis, un pour les routes login et register très strict et un autre moins stricte pour les autres routes de l'API.

- Contraintes sur les mots de passe

Les mots sont obligatoirement composés d'au moins une minuscule, une majuscule, un chiffre et un caractère spécial. Il doit être plus grand que 12 caractères.

- Hash des mots de passe

Utilisation de la dépendance bcrypt avec un salt pour hasher les mots de passe.

- Sessions

Utilisation de express-session et connect-mongo pour implémenter des sessions avec un cookie sécurisé.

Une session dure 30 minutes et est stockée dans la base de données mongoDB jusqu'à être supprimée lorsque sa durée de vie atteint son terme.
La session ne contient que l'id et le role de l'utilisateur, aucune données sensible.

La session est aussi regénérée à chaque fois qu'elle est requise pour éviter les attaques de session fixation.
