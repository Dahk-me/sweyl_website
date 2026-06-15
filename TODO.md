# TODO — sweyl_website

> Site vitrine SWEYL. V1 centrée **coachs** (cible n°1), joueurs (n°2), président
> pour visualisation (n°3). Les points communautaires sont **reportés** : ils
> reviendront quand on aura une traction technique côté coachs (l'app les fait
> adhérer, ils en parlent → on monte ensuite sur l'aspect club / vie du club).
>
> Objectif business : capter des leads qualifiés via le formulaire pour signer
> avant septembre 2026.

---

## Lot 1 — Bugs et corrections immédiates ⚡

- [ ] **Lead.jsx ligne 119** : le bouton affiche `'Envoyer ma demande'` avec les apostrophes littérales. Retirer les quotes.
- [ ] **Lead.jsx ligne 18** : typo `Reservez` → `Réservez` dans les perks.

---

## Lot 2 — CTA et alignement copy "Rejoindre l'expérience Sweyl"

- [ ] **Hero** : ajouter un bouton primaire **"J'obtiens mes accès"** qui scroll vers `#join`.
- [ ] Harmoniser **tous** les autres CTA sur `"Rejoindre l'expérience Sweyl"` :
  - [ ] `Header.jsx` (boutons mobile et desktop, actuellement "Démo" / "Demander une démo")
  - [ ] `Footer.jsx` (lien "Demander une démo")
  - [ ] `Lead.jsx` eyebrow (`—— Réserver une démo`) et titre du bloc
- [ ] Ajuster le titre du formulaire pour rester cohérent avec "Rejoindre l'expérience" (pas "réserver une démo").

> **Note** : on garde **"J'obtiens mes accès"** uniquement dans le Hero (ancrage
> action concrète) et **"Rejoindre l'expérience Sweyl"** partout ailleurs
> (positionnement). À confirmer si tu veux tout aligner sur une seule formule.

---

## Lot 3 — Repositionnement coach-first

Cohérent avec ta réponse au point 1 : on cible le coach en premier, le système
de points/club est différé.

- [ ] **ForWho** : faire de la carte Coach (`COACHER`) la première, plus longue, plus dense. Les autres restent en tags secondaires.
- [ ] Revoir le copy de la **carte Dirigeants** : retirer "Système de fidélité partenaires" (= points communautaires reportés) et le remplacer par quelque chose orienté visualisation pour le président (ex : "Vue saison du club", "Suivi de l'engagement de l'effectif").
- [ ] **Hero baseline** : "Le club est plus grand que le score." reste, mais sous-titre/CTA orienté coach : *"L'outil pensé pour les coachs amateurs."* (à valider).
- [ ] **Vision** : vérifier que le copy ne survend pas la dimension club/points (relire à froid).

> ⚠️ **DÉBAT** — on garde "Le club est plus grand que le score." en hero ?
> C'est très orienté club/dirigeant. Une baseline coach pourrait être plus
> percutante (ex : *"Coache comme un pro. Reste un amateur."* — à itérer).
> À trancher.

---

## Lot 4 — Section témoignages (verbatims)

- [ ] Créer `sections/Testimonials.jsx` avec 3-4 cartes (faux verbatims, tu remplaceras).
- [ ] Titres de cartes du type :
  - "Coach Pré-national"
  - "Coach Régionale 2"
  - "Président du club X"
  - "Joueur Région 2"
- [ ] L'ajouter à `App.jsx`.
- [ ] Style : aligné dark/light, eyebrow `—— Ils en parlent`, ton Nike.

> ⚠️ **DÉBAT** — placement dans le flux. Deux options :
> - **A** : juste avant le formulaire Lead (= dernier argument avant CTA).
> - **B** : après ForWho et avant Season (= preuve sociale au milieu).
> Je propose **A** pour pousser à la conversion. À trancher.

---

## Lot 5 — Story fondateur

Section courte, en sombre, ton sincère mais Nike. Une photo + 3 lignes max.

- [ ] Créer `sections/Founder.jsx`.
- [ ] Placement proposé : entre `SocialProof` et `Vision` (= crédibilité humaine avant la promesse).
- [ ] L'ajouter à `App.jsx`.

> ⚠️ **DÉBAT / INPUT REQUIS** — j'ai besoin de toi pour :
> 1. Une photo (portrait, format carré, à déposer dans `public/assets/founder/`).
> 2. Un mini-pitch (3-4 lignes max) — le pourquoi SWEYL existe, ton vécu coach/joueur.
> 3. Ton prénom + rôle à afficher.

---

## Lot 6 — Footer

- [ ] Ajouter le lien **Instagram** (URL à venir de ta part).
- [ ] Ajouter une mention **"Made in France"** (avec drapeau ou pas — à voir).
- [ ] Vérifier que `Demander une démo` est bien remplacé (cf. Lot 2).

> 📥 **INPUT REQUIS** — URL Instagram (et autres réseaux si tu en as : LinkedIn, X, TikTok ?).

---

## Lot 7 — Page 404 custom

- [ ] Créer `pages/NotFound.jsx` — ton SWEYL, gros titre, retour accueil.
- [ ] L'ajouter au `Routes` dans `App.jsx` (catch-all `path="*"`).

---

## Lot 8 — Vidéo hero (réponse à ta question : critique ?)

**Mon avis** : pas critique. Ça fonctionne, le visuel passe. Mais :
- la même vidéo (`hero-mobile.mp4`) est servie en desktop → résolution probablement insuffisante sur grands écrans.
- pas de `poster` → écran noir 0,5-1s au chargement.
- pas de `preload="metadata"` → la vidéo se charge même si tu skip vite.

À traiter **uniquement** si tu vois un problème de perf perçu ou de qualité visuelle sur desktop. Sinon, à laisser.

- [ ] *(optionnel)* Ajouter `poster="…"` + `preload="metadata"`.
- [ ] *(optionnel)* Encoder une version desktop séparée.

> ⚠️ **DÉBAT** — on s'en occupe maintenant ou on laisse pour plus tard ?

---

## Lot 9 — SEO de base (explication des termes)

**Petit dico avant de trancher :**

- **OG image** (Open Graph) : la grande image qui apparaît quand tu colles ton lien sur WhatsApp, LinkedIn, Slack, etc. Sans elle = aperçu nu et moche.
- **Twitter Card** : même chose pour X/Twitter (balises spécifiques).
- **JSON-LD** : un bloc de données structurées que Google lit pour comprendre que ton site est une "Organisation" / un "Software". Ça aide pour le SEO mais c'est plus avancé.
- **Favicon** : le petit logo dans l'onglet du navigateur.

**Niveau minimum recommandé pour une landing page :**
- [ ] OG image (1200×630, ton logo + baseline sur fond sombre).
- [ ] Balises `<meta property="og:…">` et `<meta name="twitter:…">` dans `index.html`.
- [ ] Favicon SWEYL en `/public/favicon.ico` + `/public/apple-touch-icon.png`.
- [ ] *(optionnel)* JSON-LD Organization.

> ⚠️ **DÉBAT** — on fait le minimum (OG + favicon) maintenant, ou on attend ?
> Recommandation : faire le minimum, ça prend 30 min et ça change la perception
> quand quelqu'un partage le lien.

---

## ✅ Écarté (sur ta décision)

- **Screenshots produit réels** → planifié pour septembre 2026 quand les écrans seront finis.
- **Pricing** → coach et président = gratuits. Joueurs : essai 1 mois puis tarif à découvrir. Tarification club viendra avec les points communautaires (phase 2).
- **Cookie banner / RGPD** → validé non nécessaire avec ta stack actuelle.
- **Pages dédiées** (`/coachs`, `/clubs`) → mode landing page only pour l'instant.

---

## 📋 Inputs en attente de ta part

| Item | Lot |
|------|-----|
| Photo + mini-pitch + prénom/rôle fondateur | 5 |
| URL Instagram (+ autres réseaux ?) | 6 |
| Validation baseline Hero + sous-titre coach | 3 |
| Choix placement section témoignages (A ou B) | 4 |
| Décision vidéo hero (maintenant / plus tard) | 8 |
| Décision SEO base (maintenant / plus tard) | 9 |
| Décision CTA : double ("J'obtiens mes accès" + "Rejoindre l'expérience") ou simple | 2 |

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
