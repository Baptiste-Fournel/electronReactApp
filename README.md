Gestionnaire de Tâches Electron avec React

Bienvenue dans le Gestionnaire de Tâches Electron avec React ! <br>
Cette application permet de gérer des tâches avec des fonctionnalités avancées, telles que l'ajout de sous-tâches, le tri des tâches par statut, l'archivage des tâches terminées, et bien plus encore. <br>
Cette application utilise Electron, React, et suit les principes de Clean Architecture pour une structure évolutive et maintenable. <br>

📋 Fonctionnalités<br>
Ajouter, modifier et supprimer des tâches.<br>
Ajouter des sous-tâches à chaque tâche.<br>
Passer les tâches d'un statut à un autre (Non commencées, En cours, Terminées).<br>
Archiver les tâches terminées.<br>
Voir et supprimer les tâches archivées.<br>
Interface utilisateur interactive et moderne.<br>
<br>
<br>
🛠️ Technologies utilisées<br>
React : Frontend dynamique et interactif.<br>
Electron : Application de bureau multiplateforme.<br>
TypeScript : Typage statique pour un code plus robuste.<br>
Clean Architecture : Architecture en couches pour un code modulaire et maintenable.<br>
Context API : Gestion d'état pour partager des données entre les composants.<br>


📂 Structure du projet <br>
renderer <br>
├── application <br>
│   ├── context <br>
│   │   └── TaskContext.tsx <br>
│   ├── service <br>
│   │   ├── TaskService.ts <br>
│   │   └── ArchiveService.ts <br>
├── domain <br>
│   ├── enums <br>
│   │   ├── TaskEnum.ts <br>
│   │   └── TaskTranslations <br>
│   ├── interface <br>
│   │   ├── ITaskRepository.ts <br>
│   │   └── IArchiveRepository.ts <br>
│   └── models <br>
│       └── Task.ts <br>
├── infrastructure <br>
│   └── storage <br>
│       └── LocalTaskRepository.ts <br>
├── adapter <br>
│   ├── components <br>
│   │   ├── App.tsx <br>
│   │   ├── TaskBoard.tsx <br>
│   │   ├── TaskColumn.tsx <br>
│   │   ├── TaskItem.tsx <br>
│   │   ├── TaskInput.tsx <br>
│   │   └── ArchivePage.tsx <br>
├── style <br>
│   ├── App.css <br>
│   ├── TaskBoard.css <br>
│   ├── TaskColumn.css <br>
│   ├── TaskItem.css <br>
│   ├── TaskInput.css <br>
│   └── ArchivePage.css <br>


🚀 Installation et exécution <br>
Prérequis <br>
Node.js (v14 ou supérieur) <br>
npm (v6 ou supérieur) <br>
 <br>
💻 Utilisation <br>
Ajouter une tâche <br>
 <br>
Remplissez le nom de la tâche, sélectionnez une catégorie (Personnel, Travail, Famille) et entrez le nom de l'auteur. Cliquez sur "Ajouter". <br>
Gérer les tâches <br>
 <br>
Déplacez les tâches entre les colonnes Non commencées, En cours, et Terminées en utilisant les icônes de flèche. <br>
Supprimez une tâche ou une sous-tâche avec l'icône de corbeille. <br>
Archiver les tâches <br>
 <br>
Lorsque vous marquez une tâche comme "Terminée", vous pouvez l'archiver. <br>
Cliquez sur "Voir les tâches terminées" pour consulter les tâches archivées. <br>
 <br>
🛠️ Dépannage <br>
Problèmes courants <br>
Problème d'installation des modules : Supprimez le dossier node_modules et le fichier package-lock.json, puis exécutez npm install à nouveau <br>.
L'application ne démarre pas : Assurez-vous que toutes les dépendances sont bien installées. <br>
 <br>
📄 Licence <br>
Ce projet est sous licence MIT. Vous êtes libre de le modifier et de le distribuer comme bon vous semble. <br>
 <br>
👤 Auteurs <br>
Baptiste Fournel - Développeur principal <br>