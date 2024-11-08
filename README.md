Gestionnaire de Tâches Electron avec React

Bienvenue dans le Gestionnaire de Tâches Electron avec React ! Cette application permet de gérer des tâches avec des fonctionnalités avancées, telles que l'ajout de sous-tâches, le tri des tâches par statut, l'archivage des tâches terminées, et bien plus encore. Cette application utilise Electron, React, et suit les principes de Clean Architecture pour une structure évolutive et maintenable.

📋 Fonctionnalités
Ajouter, modifier et supprimer des tâches.
Ajouter des sous-tâches à chaque tâche.
Passer les tâches d'un statut à un autre (Non commencées, En cours, Terminées).
Archiver les tâches terminées.
Voir et supprimer les tâches archivées.
Interface utilisateur interactive et moderne.


🛠️ Technologies utilisées
React : Frontend dynamique et interactif.
Electron : Application de bureau multiplateforme.
TypeScript : Typage statique pour un code plus robuste.
Clean Architecture : Architecture en couches pour un code modulaire et maintenable.
Context API : Gestion d'état pour partager des données entre les composants.


📂 Structure du projet
renderer
├── application
│   ├── context
│   │   └── TaskContext.tsx
│   ├── service
│   │   ├── TaskService.ts
│   │   └── ArchiveService.ts
├── domain
│   ├── enums
│   │   ├── TaskEnum.ts
│   │   └── TaskTranslations
│   ├── interface
│   │   ├── ITaskRepository.ts
│   │   └── IArchiveRepository.ts
│   └── models
│       └── Task.ts
├── infrastructure
│   └── storage
│       └── LocalTaskRepository.ts
├── adapter
│   ├── components
│   │   ├── App.tsx
│   │   ├── TaskBoard.tsx
│   │   ├── TaskColumn.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskInput.tsx
│   │   └── ArchivePage.tsx
├── style
│   ├── App.css
│   ├── TaskBoard.css
│   ├── TaskColumn.css
│   ├── TaskItem.css
│   ├── TaskInput.css
│   └── ArchivePage.css


🚀 Installation et exécution
Prérequis
Node.js (v14 ou supérieur)
npm (v6 ou supérieur)

💻 Utilisation
Ajouter une tâche

Remplissez le nom de la tâche, sélectionnez une catégorie (Personnel, Travail, Famille) et entrez le nom de l'auteur. Cliquez sur "Ajouter".
Gérer les tâches

Déplacez les tâches entre les colonnes Non commencées, En cours, et Terminées en utilisant les icônes de flèche.
Supprimez une tâche ou une sous-tâche avec l'icône de corbeille.
Archiver les tâches

Lorsque vous marquez une tâche comme "Terminée", vous pouvez l'archiver.
Cliquez sur "Voir les tâches terminées" pour consulter les tâches archivées.

🛠️ Dépannage
Problèmes courants
Problème d'installation des modules : Supprimez le dossier node_modules et le fichier package-lock.json, puis exécutez npm install à nouveau.
L'application ne démarre pas : Assurez-vous que toutes les dépendances sont bien installées.

📄 Licence
Ce projet est sous licence MIT. Vous êtes libre de le modifier et de le distribuer comme bon vous semble.

👤 Auteurs
Baptiste Fournel - Développeur principal