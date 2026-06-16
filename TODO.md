# TODO — sweyl_website

> Site vitrine SWEYL. V1 centrée **coachs** (cible n°1), joueurs (n°2), président
> pour visualisation (n°3). Les points communautaires sont **reportés** : ils
> reviendront quand on aura une traction technique côté coachs (l'app les fait
> adhérer, ils en parlent → on monte ensuite sur l'aspect club / vie du club).
>
> Objectif business : capter des leads qualifiés via le formulaire pour signer
> avant septembre 2026.

---

## Lot 1 — Bugs et corrections immédiates ⚡ ✅

- [x] **Lead.jsx** : bouton `'Envoyer ma demande'` (apostrophes littérales) corrigé.
- [x] **Lead.jsx** : typo `Reservez` → `Réservez` corrigée.

---

## Lot 2 — CTA et alignement copy ✅

**Décision actée** : double CTA — Hero = "J'obtiens mes accès" (action), partout ailleurs = "Rejoindre l'expérience" (positionnement).

- [x] **Hero** : bouton primaire **"J'obtiens mes accès"** ajouté sous le titre, ancre `#join`.
- [x] **Header** : "Rejoindre" (mobile) / "Rejoindre l'expérience" (desktop).
- [x] **Footer** : lien renommé en "Rejoindre l'expérience".
- [x] **Lead** : eyebrow `—— Rejoindre l'expérience`, titre conservé.

---

## Lot 3 — Repositionnement coach-first ✅

**Décisions actées** :
- Hero baseline pivote en coach-first : "Coache comme un pro. Reste un amateur." + sous-titre "La première plateforme pensée pour les coachs amateurs."
- Carte Dirigeants : on retire la fidélité partenaires, on garde la carte mais réorientée vue saison / engagement effectif.

- [x] **Hero** : nouvelle baseline + sous-titre coach-first.
- [x] **ForWho carte Dirigeants** : `desc` et `highlights` réorientés (`Tableau de bord club`, `Vue saison toutes équipes`, `Engagement de l'effectif`).
- [x] **PointsLeaderboard** : labels relabellisés en `ENGAGEMENT EFFECTIF` / `TOP 4` (suppression de la connotation points/récompenses).
- [x] **Vision** : déjà coach-first ("Aucun outil n'a jamais été pensé pour le coach amateur. SWEYL est le premier.") — rien à changer.

> Note différée : l'instrument visuel `PointsLeaderboard` continue d'afficher un classement avec scores. Le rendu reste cohérent comme "index d'engagement". Si tu veux un vrai widget différent pour la carte Dirigeants plus tard, on le créera (`ClubOverview`).

---

## Lot 4 — Section témoignages (verbatims) ✅

**Décisions actées** : placement après ForWho, 4 verbatims placeholder.

- [x] Créé `sections/Testimonials.jsx` avec 4 cartes (Coach Pré-national, Coach Régionale 2, Président du club X, Joueur Région 2).
- [x] Layout : sticky title à gauche, grille 2×2 à droite (stack mobile), eyebrow `—— Ils en parlent`, titre "Le terrain en parle.".
- [x] Branché dans `App.jsx` entre `ForWho` et `Season`.

> 📥 **À faire de ton côté** : remplacer les `quote` et `name` placeholder par les vrais verbatims quand tu les auras. Le champ `role` (ex: "Coach Pré-national") sert déjà de qualification professionnelle visible.

---

## Lot 5 — Story fondateur ✅ (version placeholder)

**Décision actée** : pas de photo. Traitement typographique éditorial style "manifeste".

- [x] Créé `sections/Founder.jsx` — eyebrow `—— L'histoire`, titre `Né sur le terrain. Pas dans un bureau.`, 3 paragraphes manifeste + signature `Le fondateur · SWEYL`.
- [x] Style : 2 col 35/65 desktop avec sticky title à gauche, manifeste à droite + barre verticale orange en accent. Stack mobile.
- [x] Branché dans `App.jsx` entre `SocialProof` et `Vision`.

> 📥 **À adapter par toi** : le pitch est basé sur le contexte projet (basket amateur méprisé par la tech, SWEYL comme réponse, ton Nike). Si tu veux le personnaliser (mention parcours, prénom, accroche perso), édite `Founder.jsx`. Si tu veux que je te rédige une autre version après brief, dis-le moi.

---

## Lot 6 — Footer ✅

**Inputs reçus** : Instagram + TikTok = `sweylapp`. Made in France = mono + 🇫🇷.

- [x] Nouvelle colonne **"Suivre"** dans le footer avec liens Instagram + TikTok (`https://instagram.com/sweylapp`, `https://tiktok.com/@sweylapp`) — ouverture nouvel onglet.
- [x] `FooterLink` étendu pour gérer `target="_blank" rel="noopener noreferrer"` sur les liens externes.
- [x] Bottom strip : ajout de `🇫🇷 MADE IN FRANCE` entre `© 2026 SWEYL` et `FAIT PAR LES CLUBS, POUR LES CLUBS`.
- [x] CTA "Rejoindre l'expérience" déjà confirmé au Lot 2.

---

## Lot 7 — Page 404 custom ✅

- [x] Créé `pages/NotFound.jsx` — eyebrow `—— Erreur 404`, `404` en gros orange, titre "Page hors terrain.", baseline courte, CTA `Retour à l'accueil` → `/`.
- [x] Route catch-all `path="*"` ajoutée dans `App.jsx`.

---

## Lot 8 — Vidéo hero ✅ (quick win)

- [x] `preload="metadata"` ajouté sur la balise `<video>` du Hero (charge juste les métadonnées d'abord, pas tout le payload).
- [x] `poster="/assets/hero-poster.jpg"` ajouté en attendant que tu déposes une image fallback.

> 📥 **À déposer** : `public/assets/hero-poster.jpg` (1920×1080 ou ≥, JPEG optimisé). Si le fichier n'existe pas, la balise est ignorée et tu te retrouves comme avant (écran noir 0,5s).
>
> Différé : encoder une version desktop séparée de la vidéo. À faire quand tu auras les rushs.

---

## Lot 9 — SEO de base ✅ (minimum)

- [x] `<title>` et `<meta description>` mis à jour avec la nouvelle ligne coach-first.
- [x] Favicon SVG : `LogoSweyl.svg` (déjà dans `public/assets/`) câblé via `<link rel="icon" type="image/svg+xml">` + `apple-touch-icon`.
- [x] Open Graph complet : `og:type`, `og:site_name`, `og:url`, `og:title`, `og:description`, `og:image` (1200×630), `og:locale=fr_FR`.
- [x] Twitter Card : `summary_large_image` + title/description/image.
- [x] `theme-color` (`#0a0a0a`) pour la barre d'adresse mobile.

> 📥 **À déposer** : `public/assets/og-image.png` (1200×630, logo SWEYL + baseline sur fond sombre #0a0a0a). Tant qu'il n'est pas là, l'aperçu sera nu (pas pire qu'avant). Si tu veux je peux te générer un brief visuel pour Figma/Canva.
>
> ⚠️ Si l'URL de prod n'est pas `https://www.sweyl.com/`, met-la à jour dans `index.html` (lignes `og:url`, `og:image`, `twitter:image`).
>
> Différé : JSON-LD Organization (Schema.org), `sitemap.xml`, `robots.txt`. À voir quand on aura du contenu indexable additionnel (blog, pages métier).

---

## ✅ Écarté (sur ta décision)

- **Screenshots produit réels** → planifié pour septembre 2026 quand les écrans seront finis.
- **Pricing** → coach et président = gratuits. Joueurs : essai 1 mois puis tarif à découvrir. Tarification club viendra avec les points communautaires (phase 2).
- **Cookie banner / RGPD** → validé non nécessaire avec ta stack actuelle.
- **Pages dédiées** (`/coachs`, `/clubs`) → mode landing page only pour l'instant.

---

## 📋 Inputs en attente / fichiers à déposer

| Item                                                      | Lot | Statut |
|-----------------------------------------------------------|-----|--------|
| Vrais verbatims pour Testimonials (`quote` + `name`)      | 4 | À adapter quand tu les auras |
| Pitch fondateur personnalisé (+ prénom si tu veux signer) | 5 | Optionnel — version placeholder en place |
| `public/assets/hero-poster.jpg` (1920×1080+)              | 8 | À déposer |
| `public/assets/og-image.png` (1200×630)                   | 9 | À déposer |
| URL de prod réelle (si ≠ `https://www.sweyl.com/`)        | 9 | À corriger dans `index.html` |

---

## 🤖 Prompt Claude.ai — audit final post-TODO

> À copier-coller dans Claude.ai **une fois** ce TODO traité, pour valider que
> le site live coche tous les manques.

```
Tu es un consultant UI/UX et stratégie produit confirmé. J'ai déployé mon site
vitrine SWEYL à l'URL suivante : [colle ici l'URL Vercel/prod].

Contexte produit :
- SWEYL est une plateforme de suivi de stats et de vie de club pour le sport
  amateur, basket en premier (multi-sport ensuite).
- Cible n°1 V1 : coachs amateurs (aucun outil n'existe pour eux aujourd'hui).
  Cible n°2 : joueurs. Cible n°3 : présidents/dirigeants pour visualiser.
- Le système de points communautaires est REPORTÉ — il reviendra après
  traction côté coachs.
- Douleur principale visée : "aucun outil n'a jamais été pensé pour les coachs
  amateurs — SWEYL est le premier à les prendre au sérieux".
- Différenciateurs clés : pensé amateur, toute la vie du club (pas juste les
  stats d'un match), temps réel pendant match, outil partagé coach/joueur/
  dirigeant.
- Ton de voix : Nike, exigeant et inspirant. Phrases courtes. On affirme.
  Vocabulaire du terrain ("saison", "équipe"), pas du SaaS ("solution").
- Objectif business : capturer des leads qualifiés (coachs en priorité) pour
  signer des abonnements clubs annuels avant septembre 2026.
- CTA principal : "Rejoindre l'expérience Sweyl" partout, et "J'obtiens mes
  accès" en hero (action concrète).

Ta mission :
1. Visite le site comme un coach amateur de basket, puis comme un président de
   club. Pour chaque persona : moment où tu veux cliquer ? Moment où tu
   décroches ? Qu'est-ce qui manque pour passer à l'action ?
2. Vérifie la cohérence du ton Nike (phrases courtes, on affirme). Repère
   toutes les tournures molles ("permet de", "facilite") et propose des
   reformulations percutantes.
3. Liste les sections présentes. Vérifie que coachs = cible n°1 dans le copy
   et la hiérarchie visuelle (et PAS le club/points qui sont reportés).
4. Audit technique rapide : meta SEO (title, description, OG image, Twitter
   card, favicon), responsive mobile, accessibilité (contraste focus, labels
   formulaire), 404.
5. Audit du formulaire de capture : friction minimale ? Wording cohérent
   avec "Rejoindre l'expérience" / "J'obtiens mes accès" ?
6. Audit thème clair vs sombre : aussi dynamique dans les deux modes ? Des
   sections qui cassent ?
7. Plan d'action priorisé :
   - URGENT (bugs visibles, contradiction ton/stratégie)
   - IMPORTANT (sections manquantes pour atteindre l'objectif coach-first)
   - NICE TO HAVE (polish, optimisations futures)

Format : audit clair et structuré, pas de blabla. Cite des extraits concrets
du site. Pour chaque manque, propose une formulation concrète, pas juste
"il faudrait".
```
