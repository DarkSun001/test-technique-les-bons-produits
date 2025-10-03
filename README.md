Les Bons Produits — Test Technique

Projet réalisé dans le cadre d’un test technique.
L’application permet de gérer une liste de produits (CRUD complet) via une API REST en Node.js/Express et MongoDB, avec une interface React utilisant Material UI.
Les produits sont mis à jour en temps réel grâce à Socket.IO. La gestion du state est assurée par Redux Toolkit et les actions sensibles sont sécurisées par un système d’authentification JWT.

Fonctionnalités principales
Backend (Node.js / Express / MongoDB)

API REST complète :

GET /products : récupérer les produits

POST /products : créer un produit (protégé par JWT)

PUT /products/:id : modifier un produit (protégé par JWT)

DELETE /products/:id : supprimer un produit (protégé par JWT)

Base de données MongoDB

WebSocket (Socket.IO) pour la mise à jour en temps réel

Authentification JWT avec middleware de protection

Frontend (React / Vite / Material UI)

Liste des produits avec affichage dynamique

Formulaires d’ajout, de modification et de suppression

Page de connexion (/login) avec authentification JWT

Synchronisation en temps réel via WebSocket

Gestion centralisée du state avec Redux Toolkit

Interface moderne et responsive avec Material UI

Installation et lancement

1. Cloner le dépôt
   git clone https://github.com/DarkSun001/test-technique-les-bons-produits.git
   cd test-technique-les-bons-produits

2. Installer les dépendances

Backend :

cd api
npm install
cp .env.example .env

Frontend :

cd ../client
npm install
cp .env.example .env

3. Lancer le projet

Backend :

cd api
npm run dev

Frontend :

cd ../client
npm run dev

L’application sera disponible sur :

Frontend : http://localhost:5173

Backend : http://localhost:8080

Structure du projet
test-technique-les-bons-produits/
│
├── api/ # Backend Node.js / Express / MongoDB
│ ├── src/
│ │ ├── controllers/ # Logique des endpoints
│ │ ├── services/ # Accès base et logique métier
│ │ ├── routes/ # Définition des routes Express
│ │ └── db.js # Connexion MongoDB
│ ├── scripts/seed.ts # Script d’initialisation de la base
│ ├── .env.example
│ └── package.json
│
├── client/ # Frontend React (Vite + Material UI + Redux Toolkit)
│ ├── src/
│ │ ├── components/ # Layout, ProductCard, etc.
│ │ ├── pages/ # LoginPage, ProductPage, Add/Edit/Delete
│ │ ├── services/ # api.ts + auth.ts
│ │ ├── store/ # Redux store et slice des produits
│ │ └── types/
│ ├── .env.example
│ └── package.json
│
└── README.md

Authentification

Identifiants de connexion :

Email : admin@bonsproduits.com
Mot de passe : admin

Les routes GET sont publiques.
Les routes POST, PUT et DELETE nécessitent un token JWT valide.

Bonus techniques implémentés
Bonus Statut Description
WebSocket Validé Mise à jour en direct avec Socket.IO
Authentification JWT Validé Sécurisation des routes API et du front
Redux Toolkit Validé Gestion du state global et synchro temps réel
Material UI Validé Interface claire et responsive
ESLint Validé Code propre et conforme au linter
Auteur

Jonathan Georges
Étudiant en 4e année à l’ESGI
Développeur Fullstack
GitHub : DarkSun001
