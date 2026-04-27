# Sprint Demo Agritech

## Deadline
- Date de fin : 4 mai 2026

## Objectif
Réaliser une version de démonstration mobile/terrain d'Agritech en 7 jours.

## Écrans prioritaires
### Mobile (5 écrans existants, prioriser 4)
1. Tâches terrain (`/mobile`)
2. Incidents (`/mobile/incidents`)
3. Photos terrain (`/mobile/photos`)
4. Clôturer une intervention (`/mobile/cloturer`)
5. Équipe (`/mobile/equipe`) — support si temps

### Exploitant (2 écrans prioritaires)
1. Accueil exploitant (`/exploitant`)
2. Problèmes / incidents (`/exploitant/problemes`)

## À masquer / marquer legacy
- `/app`
- `/ops`
- `/analytics`
- `/kanban`

## Interdits pour ce sprint
- Render
- GitHub
- Postgres
- Redis
- S3
- Stripe
- BullMQ
- PWA
- i18n
- CI/CD

## Notes
- Se concentrer sur des mocks réalistes et cohérents.
- Ne pas dériver vers des fonctionnalités secondaires avant le jour 7.
- Prioriser l’interface et la clarté métier pour le père.
- Le mobile terrain possède déjà un menu à onglets et des écrans fonctionnels : Tâches, Incidents, Photos, Équipe, Clôturer.
- Pour la démo, garder les liens directs sur `/mobile` et `/exploitant`, sans exposer les écrans legacy.

## Contraintes UX (à respecter sur tous les écrans)

### Interactions
- Uniquement des taps sur boutons visibles
- Aucune action par swipe, drag, long press
- Pas de modal flottante : chaque action = une page entière
- Pas de pop-up, pas de tutoriel, pas de notification surgissante
- Une seule action principale par écran

### Tailles
- Boutons : minimum 60px de hauteur
- Texte : minimum 18px, idéalement 20px
- Touch targets : minimum 44px

### Vocabulaire
- Mots autorisés : Voir, Faire, Photo, Problème, Valider, Terminer, Retour
- Mots à éviter : Détails, Confirmer, Signaler, Soumettre, Annuler

### Couleurs sémantiques
- Rouge : urgence, problème
- Vert : OK, terminé, validé
- Orange : attention, en retard
- Pas de subtilité, pas de dégradé décoratif

### Cible utilisateur
Android basique, en extérieur, au soleil, doigts éventuellement sales,
utilisateur peu à l'aise avec les outils numériques.
Si une feature ne passe pas ce test, on la coupe.
