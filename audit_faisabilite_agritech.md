# Audit de faisabilité - Projet d'application Agritech

Date : 2 avril 2026

## 1) Périmètre réellement disponible

Le workspace ne contient pas de code applicatif. Il contient un document PDF de 931 pages, qui semble être une transcription/itération de conception produit et technique.

Conséquence :
- audit de code (qualité, sécurité applicative, dette technique) impossible à ce stade ;
- audit de faisabilité produit/technique possible, sur base des exigences présentes dans le document.

## 2) Ce que le document décrit (éléments structurants)

Le projet est une application de pilotage d'exploitation agricole multi-activité :
- pisciculture ;
- volaille ;
- élevage d'insectes (mouches soldats) ;
- arboriculture (et extension possible maraîchage).

Usage terrain :
- tâches guidées ;
- validation simple (à faire / en cours / fait / problème) ;
- preuve photo ;
- signalement d'incident ;
- formation embarquée (capsules/checklists).

Usage management/admin :
- dashboards et KPI ;
- alertes ;
- supervision multi-zones ;
- paramétrage.

Stack technique mentionnée :
- front mobile : FlutterFlow ;
- backend : Supabase (auth, base, stockage média) ;
- automatisation : Make ;
- IA (progressive) : API OpenAI + règles métier déterministes.

Architecture data :
- un schéma SQL assez avancé est décrit ;
- 22 tables repérées (farms, users, activity_types, production_zones, managed_assets, tasks, observations, incidents, alerts, ai_analyses, etc.).

Contraintes opérationnelles explicites :
- contexte terrain Congo ;
- connectivité parfois dégradée ;
- utilisateurs peu qualifiés ;
- besoin fort d'UX ultra simple et robuste.

## 3) Verdict de faisabilité

Verdict global : FAISABLE, avec fort potentiel, sous condition de discipline MVP.

Niveau de confiance : moyen à élevé (le cadrage fonctionnel est riche, mais sans code existant à auditer).

Pourquoi c'est faisable :
- le problème métier est clair ;
- l'architecture cible est cohérente (mobile + backend managé + IA progressive) ;
- le modèle de données couvre bien les objets critiques ;
- le document insiste correctement sur un déploiement par phases.

## 4) Principaux risques (du plus critique au moins critique)

1. Risque d'adoption terrain
- Si l'app est trop complexe, l'usage chute fortement.
- Mitigation : UX minimaliste, flux très guidés, peu de saisie texte, photo obligatoire sur tâches critiques.

2. Risque de sur-périmètre (scope creep)
- Beaucoup d'idées avancées (IA, SaaS, RH avancée, météo, analytics poussés).
- Mitigation : geler un MVP strict et reporter les modules non essentiels.

3. Risque réseau / offline
- Le terrain peut être en connectivité intermittente.
- Mitigation : conception offline-first, file d'attente locale, reprise/synchronisation robuste, résolution de conflits simple.

4. Risque qualité data
- Photos, observations et statuts peuvent être hétérogènes.
- Mitigation : formats imposés, validations côté app, protocoles/checklists standard.

5. Risque IA mal maîtrisée
- LLM sans garde-fous peut produire des recommandations fragiles.
- Mitigation : IA en assistance, jamais en décision autonome ; règles déterministes prioritaires.

## 5) Faisabilité par dimension

Technique : OUI
- FlutterFlow + Supabase convient à une V1 opérationnelle rapide.
- Limite : anticiper tôt les besoins de custom logic (offline et workflows avancés).

Produit : OUI
- Le problème utilisateur est concret et fréquent.
- L'approche preuve photo + tâches guidées est pertinente pour publics peu formés.

Opérationnelle : OUI SOUS CONDITIONS
- Nécessite conduite du changement, formation courte, et pilotage terrain hebdomadaire.

Économique : PROBABLEMENT OUI
- Une V1 no-code/low-code réduit les coûts de démarrage.
- Les coûts IA doivent rester progressifs et contrôlés par cas d'usage à valeur.

## 6) MVP recommandé (à ne pas dépasser en V1)

Inclure :
- authentification + rôles (ouvrier, chef de site, exploitant/admin) ;
- tâches terrain + statuts ;
- prise de photo liée à tâche/incident ;
- incidents + alertes de base ;
- dashboards simples (volumes, tâches en retard, incidents ouverts).

Reporter :
- RH avancée ;
- IA multimodèle/complexe ;
- météo/contextualisation avancée ;
- logique SaaS multi-clients complète.

## 7) Estimation de trajectoire réaliste

Phase 1 (4-6 semaines)
- MVP terrain + supervision de base.

Phase 2 (3-6 semaines)
- fiabilisation, analytics utiles, amélioration UX, règles métier.

Phase 3 (optionnelle, 4-8 semaines)
- IA assistée, industrialisation, ouverture multi-fermes.

Durées à ajuster selon : disponibilité équipe, qualité des retours terrain, discipline de périmètre.

## 8) Go / No-Go

Go conditionnel recommandé si les 4 conditions suivantes sont validées :
- MVP figé par écrit ;
- 1 pilote terrain réel disponible ;
- stratégie offline explicitement spécifiée ;
- critères de succès Sprint 1 définis (adoption, complétion tâche, qualité photo, remontée incident).

## 9) Prochaines actions immédiates

1. Transformer le contenu du PDF en backlog priorisé (Must/Should/Could).
2. Finaliser le schéma de données MVP (en retirant les tables non essentielles V1).
3. Définir les 5 parcours critiques utilisateur (ouvrier, chef, exploitant).
4. Construire un prototype cliquable testable en conditions terrain.
5. Lancer un pilote de 2 semaines avec métriques d'usage réelles.
