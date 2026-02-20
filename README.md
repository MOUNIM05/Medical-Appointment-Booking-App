# Medical Appointment Booking App

Version mobile-first (React/Vite) qui simule le parcours patient : recherche de médecins, réservation, messagerie, itinéraire et assurance (mocks côté client).

## Sommaire
- Fonctionnalités
- Architecture
- Flux utilisateur
- Installation
- Personnalisation
- Limites

## Fonctionnalités
- Accueil : héro CTA, recherche rapide, stats, médecins recommandés, historique, bannière rappels (24h / 1h, mock localStorage).
- Recherche : filtre texte/spécialité, cartes médecins.
- Profil médecin : note, expérience, créneaux sélectionnables, statut en ligne, actions Appel audio / Appel vidéo (simulées), accès chat.
- Réservation : choix date/heure, confirmation, lien direct Itinéraire.
- Rendez-vous : onglets À venir / Passés, annulation, bouton Itinéraire par RDV.
- Messagerie : conversations par médecin, chat simulé, actions audio/vidéo.
- Assurance (mock paiement) : écran Protection avec plans + bouton Payer.
- Itinéraire : tracé SVG stylisé + étapes listées.
- Profil : infos patient, switch notifications.
- Navigation persistante : barre fixe (Accueil, Recherche, RDV, Profil) via `AppLayout`.

## Architecture
- `src/app/pages/` : Home, Search, DoctorProfile, BookingConfirmation, Appointments, Profile, Messages, Protection, Itinerary, NotFound.
- `src/app/components/` : MobileNav, AppLayout, UI génériques, DoctorCard, AppointmentCard.
- `src/app/data/mockData.ts` : médecins, rendez-vous (mock).
- `src/styles/` : `theme.css`, `tailwind.css`, `fonts.css`, `index.css`.
- `public/` : uniquement `favicon.ico` (assets nettoyés).

## Flux utilisateur
1. Home → Recherche ou médecin recommandé  
2. Profil médecin → sélection de créneau → Confirmation  
3. RDV → Itinéraire ou Annulation  
4. Messages accessibles via nav ou profil médecin  
5. Assurance via écran Protection (paiement simulé)

## Installation
```bash
npm install
npm run dev    # http://localhost:5173
npm run build  # build production
```

## Personnalisation
- Données : `src/app/data/mockData.ts`
- Palette / tokens / rayons : `src/styles/theme.css`
- Assets : ajouter/remplacer dans `public/` (actuellement seulement `favicon.ico`)

## Limites
- Pas de backend ni d’auth réels (tout mock).
- Paiement, notifications, messagerie, statut en ligne : simulés.
- Itinéraire : illustration statique (SVG).
