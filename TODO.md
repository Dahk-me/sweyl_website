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
- Hero baseline : "Tes étoiles. Ton terrain." (dual coach/joueur, métaphore étoiles, percutant) + sous-titre "La première plateforme qui accompagne coachs et joueurs pour les faire briller davantage."
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

## Lot 8 — Vidéo hero ✅ (quick win) · ⛔ remplacé par le lot 11 (04/10/2026)

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
| ~~`public/assets/hero-poster.jpg`~~                         | 8 | Sans objet depuis le lot 11 (plus de vidéo) |
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

---

## Lot 10 · Passage aux vraies captures d'app

> Ouvert le 29/08/2026. Objectif : retirer du site les éléments fabriqués qui
> simulent l'application, et les remplacer par des captures issues du CSS réel
> du produit, via l'outil `gts/brand-assets/screenshots/` (skill
> `sweyl-app-screenshots`).

### Décisions actées

- **Périmètre : `ClubLife` et `ForWho` uniquement.** `Vision` (ses 3
  `PLACEHOLDER_IMG` Supabase) et une éventuelle galerie « Dans l'app » restent
  hors périmètre, pour ne pas transformer la page en catalogue de téléphones.
- **Thème : les deux.** Chaque capture existe en clair et en sombre, l'image
  suit le toggle du site.
- **Deux variantes par emplacement.** Chaque slot du site reçoit une capture A
  et une capture B, toutes deux produites et déployées. Le choix se fait ensuite
  en changeant **une seule ligne** dans `src/lib/appShots.js`.
- **Écran coach : l'analyse vidéo** en variante A. La photo `assets/match.jpg`
  est conservée, Ismail la remplacera par une photo de son club plus tard.
- **Principe transverse : on épure.** Une capture transmet le message et
  l'envie, elle ne reproduit pas la densité réelle de l'écran. Moins de lignes,
  moins de tuiles, plus de respiration. La fidélité au pixel n'est pas
  l'objectif, et **une feature pas encore livrée peut être montrée** : le site
  doit donner envie de télécharger, rien n'est facturé aujourd'hui.

### 10.1 Les dix captures (5 emplacements × 2 variantes)

Les dix sont produites et déployées. **Le choix d'Ismail, arrêté le 29/08/2026,
est marqué ✅** ; la variante non retenue reste en ligne, une bascule ne coûte
qu'une lettre dans `src/lib/appShots.js`.

| Emplacement site | Variante A | Variante B |
|---|---|---|
| `ClubLife` | ✅ `live` : suivi du match en direct, score et flux | `saisie` : la saisie des stats pendant le match |
| `ForWho` 01 Coachs | ✅ `coach` : analyse vidéo, action taguée au joueur | `coach2` : accueil coach, la semaine de l'équipe |
| `ForWho` 02 Joueurs | `joueur` : sa fiche du match, ses points forts | ✅ `joueur2` : son profil de saison et sa progression |
| `ForWho` 03 Fans & parents | `familles` : le calendrier du club | ✅ `familles2` : accueil famille, résultat et prochain match |
| `ForWho` 04 Présidents | `club` : assiduité aux entraînements par équipe | ✅ `club2` : le hub du club, toutes les équipes |

Deux libellés de `ForWho` ont suivi le choix des variantes : `Comparatifs
équipe` devient `Progression sur la saison` (la capture montre une courbe), et
`Assiduité par équipe` devient `Assiduité et engagement`, formulation qui tient
avec `club` comme avec `club2`.

Allègements appliqués aux écrans qui existaient déjà :

- **`coach`** : la liste d'actions répétait cinq fois « #7 Malik Sanchez ».
  Descendue à 3 lignes, vidéo et filtre joueur conservés.
- **`joueur`** : rangée REB / AST / STL / BLK / TO retirée, « Points forts »
  réduit à 2 lignes.
- **`club`** : 6 équipes ramenées à 4. À 290 px de large, six lignes sont
  illisibles.
- **`familles`** : correction d'un vrai bug, la pastille Domicile / Extérieur
  utilisait `--pill-color` au lieu de `--c-ui-status-pill-color` et sortait donc
  sans fond.

### 10.2 Agencement · `ClubLife`

Aujourd'hui : colonne droite = paragraphe, `LiveScoreboard`, puis deux encarts
en dur (« MEILLEUR JOUEUR L. MARTIN », « SPECTATEURS 84 EN DIRECT »).

Cible : la colonne droite (65 %, environ 845 px) passe en grille interne
`auto 1fr` :

- à gauche, le téléphone, largeur `clamp(260px, 30%, 330px)`, posé sur un halo
  radial orange discret ;
- à droite, trois affirmations courtes empilées (eyebrow mono + une ligne).
  Elles remplacent les deux encarts inventés :
  `SAISIE GUIDÉE / Un joueur non-titulaire suffit`,
  `TEMPS RÉEL / Le banc, les tribunes, la maison`,
  `APRÈS LE MATCH / La feuille est déjà remplie`.

Mobile : paragraphe, téléphone centré, puis les trois affirmations empilées.

### 10.3 Agencement · `ForWho`

Aujourd'hui : quatre cartes empilées, l'instrument occupe toute la largeur de la
carte sous le texte. Un iPhone pleine largeur dans une carte de 813 px serait
démesuré.

Cible, desktop : chaque carte passe en deux colonnes internes.

- Gauche (environ 58 %) : tag, titre, description, les 3 tirets.
- Droite (environ 42 %) : le téléphone, largeur `clamp(220px, 26vw, 290px)`,
  aligné en bas et débordant légèrement sous le padding, pour l'effet « posé sur
  la carte » plutôt que « collé dedans ».
- Le côté du téléphone alterne d'une carte à l'autre, pour casser la répétition
  sur quatre cartes de suite.

Mobile : texte puis téléphone centré à 200 px de large.

### 10.4 SocialProof

Trois des quatre compteurs passent aux **vraies valeurs** données par Ismail le
29/08/2026 : **1500 joueurs, 90 coachs, 4 clubs**. La grille 2 × 2 est conservée,
la quatrième tuile « matchs / semaine » aussi. ⚠️ Elle affiche toujours l'ancien
`100+`, **seul chiffre inventé restant sur le site**.

### 10.5 Pipeline image

```bash
cd brand-assets/screenshots
node capture.mjs --all --theme dark  --format web --out ../../sweyl_website/public/assets/app
node capture.mjs --all --theme light --format web --out ../../sweyl_website/public/assets/app
# puis conversion WebP (cwebp est déjà installé sur la machine)
```

- Format `web` = 598 × 1180, fond transparent. Affiché à 330 px maximum sur le
  site : on reste au-dessus de la densité 2x sur écran Retina.
- 10 écrans × 2 thèmes = **20 fichiers**, environ 40 à 90 Ko chacun en WebP.
- Nommage : `public/assets/app/<ecran>_<theme>.webp`.

**Le code front n'est pas exposé.** La sortie est une image matricielle. Les
noms de classes réels ne vivent que dans `brand-assets/screenshots/screens/`,
qui reste dans le monorepo et n'est jamais déployé sur Vercel.

Nouveaux fichiers côté site :

- `src/lib/appShots.js` : la table emplacement vers variante. **C'est le seul
  fichier à éditer pour basculer une capture de A vers B.**
- `src/components/AppShot.jsx` : lit `useTheme()`, choisit `_dark` ou `_light`,
  `width` / `height` fixes contre le CLS, `loading="lazy"` sauf `ClubLife`.

### 10.6 Ce qu'on supprime

- `src/components/Instruments.jsx` en entier : `LiveScoreboard`, `PlayerCard`,
  `CalendarWidget`, `PointsLeaderboard`.
- Les deux encarts en dur de `ClubLife`.
- `public/assets/players/l-martin.png`, dont `PlayerCard` était le seul usage.
- `src/components/sections/Capacities.jsx` (section morte, décision du
  29/08/2026). `Community.jsx` est **conservée** telle quelle : elle reviendra.

### 10.7 Fait le 29/08/2026

Tout le lot est implémenté et le build passe. Vérifié au rendu réel (Playwright)
en thème clair et sombre, desktop 1440 px et mobile 390 px.

**Un piège rencontré, à ne pas réintroduire.** La première version faisait
déborder le téléphone de 48 px sous le padding de la carte `ForWho`, pour l'effet
« posé dessus ». Avec `align-items: center`, la carte se cale sur la hauteur
*réduite* du téléphone : il était donc rogné **par le haut aussi**, visible sur
les cartes 2 et 4. Le téléphone est maintenant montré en entier. Ne pas remettre
de marge négative sans repasser la grille en `align-items: end`.

Autres réglages issus de la relecture visuelle :

- `club.mjs` était descendu à 4 équipes, ça laissait un pavé vide en bas de
  l'écran. Remonté à 6 : à cette taille, le vide se voit plus que la densité.
- `live.mjs` et `saisie.mjs` ont gagné une ligne de flux et le groupe « Fautes »,
  pour la même raison.
- `joueur2.mjs` : la courbe touchait le bord de la carte et son point final
  était rogné. Marge interne de 6 px ajoutée.
- `AppShot` adoucit son ombre portée en thème clair (`0.45` tachait sur `#f6f7f8`).

### Reste à faire

| Point | Statut |
|---|---|
| Valeur réelle de la tuile « matchs / semaine » (affiche encore `100+`) | en attente d'Ismail |
| Choix A ou B pour chacun des 5 emplacements | ✅ tranché le 29/08/2026 : A A B B B |
| Ajustements de finition demandés par Ismail | à venir |
| Remplacer `assets/match.jpg` par une photo du club d'Ismail | plus tard, à sa main |

### Hors périmètre, laissé en l'état

- `Vision.jsx` et ses 3 `PLACEHOLDER_IMG` Supabase.
- `public/assets/og-image.png`, toujours absent (reliquat du lot 9).
  `hero-poster.jpg` est sans objet depuis le lot 11.

---

## Lot 11 · Entrée du site sans vidéo (04/10/2026)

**Pourquoi** : la vidéo du hero, servie depuis le bucket Supabase `video_hero`, faisait
dépasser le quota d'egress du projet. Elle est supprimée, pas remplacée par un autre média.

**Décision** : l'entrée ne charge **plus aucun média distant**. Tout est SVG et CSS, ce qui la
rend instantanée et gratuite en bande passante. Ne pas y réintroduire de vidéo ni d'image
hébergée sur Supabase.

- [x] `Hero.jsx` réécrit : la salle lumières éteintes, un projecteur orange, le parquet en
  perspective dont les lignes se tracent à l'arrivée (rond central orange).
- [x] Logo en grand au centre, `SWEYL` en dessous (Montserrat espacé, même famille que le
  header), reflet orange qui balaie le logo.
- [x] Baseline du lot 3 conservée (« Tes étoiles. Ton terrain. »), sous-titre ramené à deux
  phrases courtes.
- [x] Fil de match « LIVE » animé (score + action toutes les 2,4 s) : on montre le temps réel
  au lieu de le dire.
- [x] CTA du lot 2 conservé (« J'obtiens mes accès »), halo pulsé, mention « Saison 2026/27 ·
  accès ouverts ». L'indice « Défile » a été retiré (trop marqué « site généré »).
- [x] Header : logo et wordmark masqués tant qu'on est sur l'entrée (pas deux logos à l'écran).
- [x] **Le hero suit le thème** (clair comme sombre). Il était forcé en sombre pour que le header
  reste lisible par-dessus la vidéo : sans vidéo, cette contrainte tombe. Le forçage de couleur
  du header sur l'entrée (`inHero || theme === 'dark'`) est supprimé, le scroll ne sert plus qu'à
  effacer son logo. Couleurs du hero en tokens (`--fg`, `--bg`, `--hero-*` redéfinis en clair).
- [x] `prefers-reduced-motion` respecté : état final affiché, fil de match figé.
- [x] `temp/` ajouté au `.gitignore`.

> 📥 **À faire de ton côté** : supprimer le fichier `hero-mobile.mp4` du bucket `video_hero`
> sur Supabase une fois la branche en prod.
>
> Reste à surveiller sur l'egress : les 3 `PLACEHOLDER_IMG` de `Vision.jsx` sont toujours
> servis depuis Supabase Storage, comme les logos de `SocialProof.jsx`.


---

## Lot 12 · Passe « ne pas faire site généré » (04/10/2026)

**Pourquoi** : le site est la vitrine par défaut. Un visiteur qui se dit « encore un projet fait
avec de l'IA » ne signe pas. Une revue a listé les tics visuels et d'écriture typiques des pages
générées, et cette passe corrige tout ce qui ne demande pas d'input d'Ismail.

**Règles qui en découlent, à tenir pour la suite** :
- pas de préfixe « —— » sur les eyebrows, pas d'emoji dans l'interface ;
- pas de halo flou, de grain, de texte lumineux, de compteur animé, de point « live » hors du
  vrai direct ;
- pas de numérotation décorative (01/02, UN/DEUX) ;
- pas de formule « Pas X. Y. » ni « Plus qu'un outil » ;
- **tutoiement partout**, « on » pour l'équipe SWEYL.

- [x] Eyebrows sans « —— » (toutes les sections et la 404).
- [x] Bouton de thème : icônes soleil / lune au lieu des emojis (header et mentions légales).
- [x] Footer : « 🇫🇷 MADE IN FRANCE » remplacé par « CONÇU À REIMS », tagline raccourcie.
- [x] Hero : sans grain ni texte lumineux, projecteur fixe. Sous-titre choisi par Ismail parmi
  sept propositions : « Le match, l'entraînement, la saison. Tout ton club, vu comme chez les pros. »
  Les stats ne sont qu'un sous-produit, le sous-titre ne doit pas s'y réduire.
- [x] ClubLife : halo derrière le téléphone retiré, « Club » sans majuscule.
- [x] SocialProof : chiffres fixes (plus de compteur), sans ★, titre « Ils ont déjà signé. ».
- [x] Founder : titre « Né au bord du terrain. », formules creuses retirées, « Excel ».
- [x] Vision : cartes sans « UN / DEUX / TROIS », descriptions réécrites, constantes d'image
  renommées (elles ne sont plus des placeholders).
- [x] ForWho : sans numéros 01 à 04, titre « Chacun son rôle. », tutoiement.
- [x] Testimonials : guillemet géant retiré, eyebrow et sous-titre réécrits.
- [x] Season : point rouge et halo retirés, étapes sans jargon.
- [x] Lead : titre réécrit, « FORMULAIRE QUALIFIÉ » retiré, « 24h » une seule fois, voix unique.
- [x] FAQ : tutoiement, réponses qui ne commencent plus toutes par « Oui. / Non. », plus de
  « switch », « live match », « PWA », « onboarding ». Plus de « démarrage en septembre ».
- [x] Mentions légales : ponctuation de l'article propriété intellectuelle.

> 📥 **Reste à Ismail** : vrais témoignages (nom, club, photo si possible), nom et photo du
> fondateur, confirmation de « 100+ matchs / sem », vraies images de Vision, identité légale dans
> les mentions (forme, SIREN, directeur de publication nommé).
