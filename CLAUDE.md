# SWEYL Site Vitrine

## Le produit

SWEYL est une plateforme de suivi de statistiques pour le sport amateur (basket en premier, multi-sport ensuite). Objectif assumé : **devenir LA référence du sport amateur** pas un outil parmi d'autres, le nouveau standard.

Un seul outil partagé entre coachs, joueurs et dirigeants. Chacun y trouve ce qui lui importe. Le tout permet à chacun de progresser et de s'améliorer.

## Cibles (dans l'ordre de priorité)

1. **Coachs** cible principale. Ils n'ont aujourd'hui aucun outil fait pour eux et leurs joueurs dans le milieu amateur. Aucune référence n'existe : SWEYL impose le standard.
2. **Joueurs** veulent suivre leur progression, partager leurs perfs.
3. **Dirigeants / présidents de club** veulent la vie du club centralisée, l'engagement des membres.

## Douleur principale

Les coachs amateurs ont plein de douleurs, mais la plus profonde : **aucun outil n'a jamais été pensé pour eux**. Pas une version dégradée d'un logiciel pro, pas un tableau Excel partagé rien. SWEYL est le premier à prendre cette cible au sérieux.

## Différenciateurs

- **Pensé pour l'amateur** dès le départ pas un outil pro mal adapté
- **Toute la vie du club** sur une saison entière, pas juste les stats d'un match
- **Temps réel** pendant le match
- **Outil partagé** coach, joueur, dirigeant sur la même plateforme, chacun avec sa vision

## Ton de voix Exigeant & Inspirant

Modèle de référence : Nike. On parle à des compétiteurs. On élève le niveau.

**Ce qu'on fait :**
- Phrases courtes. Percutantes. Chaque mot compte.
- On affirme, on ne propose pas ("SWEYL change le jeu" pas "SWEYL pourrait vous aider")
- On parle au coach, pas au marché ("Ton équipe mérite mieux" pas "Les coachs ont besoin de…")
- On challenge : on suppose que le lecteur est ambitieux, exigeant, pas satisfait du statu quo
- Vocabulaire du terrain, pas du SaaS "saison", "terrain", "équipe", pas "solution", "plateforme", "onboarding"

**Ce qu'on évite :**
- Paragraphes de 4 lignes ou plus → maximum 2 lignes par paragraphe sur le site
- Listes à puces dans le copy marketing
- Jargon tech
- Tournures molles : "permet de", "aide à", "facilite" → bannir
- Répéter ce qui est évident depuis le visuel

## Stratégie CTA

L'objectif est la **prise de contact déguisée en création de compte**.

- Bouton principal : **"Créer mon compte"** ou **"Rejoindre SWEYL"** jamais "Contacter"
- Formulaire : capture nom + email + club + rôle → déclenche une prise de contact manuelle
- Message implicite : le compte est prêt à être activé, l'équipe valide et accompagne l'onboarding
- Jamais montrer que c'est manuel côté back-office

## Règles de rédaction pour le site

1. **Chaque section = une idée.** Pas deux.
2. **Eyebrow** (le petit texte en orange) : ancre factuelle ou de contexte pas un slogan
3. **Titre** : l'idée forte, mémorable, jamais plus d'une ligne sur desktop
4. **Sous-titre** : max 2 lignes, précise le titre, ne le répète pas
5. **Corps** : jamais plus de 2 paragraphes courts par section
6. **Si tu te demandes si c'est trop long : c'est trop long.**

## Vision long terme

Multi-sport. Handball, volleyball, football, rugby… Le basket est le sport d'entrée. Le copy doit rester suffisamment ouvert pour ne pas enfermer SWEYL dans "la plateforme basket".

## pro.sweyl.com, l'offre Pro

Page de teasing de l'offre Pro (une équipe : scouting, stats des deux camps, analyse du match,
vidéo calée sur les statistiques). Elle ne se lit pas avec les règles de ton ci-dessus : elle parle
au **staff d'une équipe de prénationale à N1**, pas aux clubs amateurs.

- **Vouvoiement**, « nous » pour Sweyl. Lexique du terrain : entre-deux, buzzer, duel, système,
  pick and roll, transition, rebond offensif, box score, Éval, +/-. Jamais « solution »,
  « plateforme », « fonctionnalité », « digitaliser ». **Pas de « quatre facteurs »** ni de détail
  des indicateurs d'analyse (*arbitrage d'Ismail du 19/10/2026*) : la page montre le fil du match,
  l'adresse et la carte des tirs, elle n'explique pas la méthode.
- **Aucun prix**, ni chiffre ni fourchette. La seule phrase tarifaire permise est « Le tarif,
  communiqué à la démo ». Un seul appel à l'action : « Réserver une démo ».
- **Rien n'y est promis qui ne soit dans les specs** (`OpposingTeams.md` §3, `OpponentStats.md` §3,
  `VideoAnalysis.md`, `LectureDesChiffres.md` §3.1), et **aucun mot d'exclusivité** (« réservé »,
  « exclusif », « uniquement ») : la carte des tirs existe aussi hors du Pro.
- **Captures** : une seule scène montre la même capture sur ordinateur, tablette et téléphone ;
  toutes les autres sont en tablette paysage. La vidéo se dit « tablette et ordinateur », jamais
  téléphone. Jamais le nom d'un vrai club adverse, jamais de vrai nom de personne (le compte de
  démo en porte : on les renomme en base locale avant de capturer). Une photo de joueur est un
  visage **généré** (aucune personne réelle), les vidéos des fiches des liens YouTube publics.
- **Le hero tient en un seul écran** à l'arrivée, comme l'accueil de sweyl.com : logo animé et
  « SWEYL PRO », accroche, démo. Rien d'autre (l'index des piliers en est sorti pour aérer).
- **Chaque titre porte son mot en orange**, écrit `*mot*` dans les fichiers de langue (rendu par
  `src/components/Accent.jsx`).
- ⛔ **Jamais l'écran de saisie** dans une capture du site, aujourd'hui comme demain : on montre ce
  que la saisie produit (box score, analyse), pas le geste. Le texte peut dire qu'elle se fait
  « sur le même écran que les vôtres ».
- Les captures sont celles de **l'application réelle**, prises sur une instance locale puis posées
  dans leur cadre par le mode composition de `brand-assets/screenshots` (`compose.mjs`).
- Le hero joue un vrai système, nommé (Spain pick and roll) ; ses données vivent dans
  `src/pro/play.js`, un autre système se joue en changeant ce fichier seul.
- **Textes** dans `src/i18n/locales/<langue>/pro.json`, **structure** (sections, captures, ordre)
  dans `src/pro/copy.js`. **Routage** : `pro.html` est une seconde entrée Vite, servie
  sur l'hôte `pro.sweyl.com` par `middleware.js` (une réécriture de `vercel.json` passerait après
  le système de fichiers et servirait `index.html` sur « / »). `sweyl.com/pro` redirige.
  Les liens entre les deux sites passent par `src/lib/siteUrls.js` : domaines de production sur
  `sweyl.com` et `pro.sweyl.com`, même serveur partout ailleurs (local, prévisualisation).

**La marque « SWEYL PRO »** (`src/components/SweylProMark.jsx`) : « SWEYL » dans la couleur du
texte, « PRO » en orange, cadre orange. Sur `sweyl.com`, c'est un lien vers `pro.sweyl.com` parmi
les boutons du header, toujours visible ; il remplace le bandeau du handoff, qui disparaissait au
premier défilement (*arbitrage d'Ismail du 19/10/2026*). Sur la page Pro, elle suit le logo, à la
place du mot SWEYL.

**Captures recomposées** : une capture peut réagencer les vrais composants de l'application (la
capture d'analyse place le fil du match et l'adresse à gauche, la carte des tirs à droite), jamais
inventer un écran ni une donnée.

## Formulaire de démo

Les deux formulaires (`Lead.jsx`, `src/pro/sections/ProLead.jsx`) partagent `src/components/lead/`
et postent sur `api/submit-lead.js`, une fonction Vercel déployée avec le site. Elle envoie un mail
par Mailjet (clés `MAILJET_API_KEY` et `MAILJET_SECRET_KEY` dans les variables du projet Vercel) et
**ne stocke rien** : le suivi des réponses se fait dans la boîte mail.

- Sujet : `Nouvelle demande de démo {club}` pour le site, `PRO · Démo {niveau} · {club}` pour le
  Pro (niveau obligatoire, pas de rôle joueur). Valeurs échappées dans le HTML du mail.
- **Filtre anti-robots** (`api/_lib/leadFilter.js`, testé par `npm test`) : champ piège et temps de
  remplissage minimal rejettent sans bruit ; le charabia (au moins deux champs parmi nom, club et
  message faits d'un bloc de 12 caractères ou plus avec 3 passages minuscule-majuscule) part avec
  le préfixe `[Spam probable]`, sans être supprimé. Calibré le 19/10/2026 sur 29 demandes réelles :
  13 robots sur 13, 0 vrai contact sur 15.

## Traduction

Le site et `pro.sweyl.com` existent en **français (référence), anglais et espagnol** depuis le
20/10/2026. Règles du domaine dans `specs/Internationalisation.md` §9 (dépôt racine).

- **Aucun texte affiché en dur.** Il vit dans `src/i18n/locales/<langue>/<espace>.json` :
  `common` (ce que partagent les deux sites), `home` (`sweyl.com`), `pro` (`pro.sweyl.com`). Une
  clé naît en français, se nomme en anglais par ce qu'elle est à l'écran, et arrive avec son
  anglais et son espagnol dans le même commit : `npm test` refuse une clé absente ou vide, un
  paramètre `{{x}}` qui diffère, un nombre de `*mot*` qui change, et une clé appelée dans le code
  qui n'existe pas en français.
- **Jamais de tableau dans un fichier de langue** : l'outil Excel ne sait pas les réécrire. L'ordre
  d'une liste vit dans le code (`faqs`, `PRO_SECTIONS`), ses textes dans un objet à clés nommées.
- **Aucun `t()` au chargement d'un module** : une constante traduite figerait la langue. Les
  composants appellent `useTranslation` et lisent leurs textes au rendu.
- **Ismail corrige les textes sans Claude** par le classeur du front : `npm run i18n:export` dans
  `gts-ui-react` (onglet « Site »), puis `npm run i18n:import -- <classeur>`, sur une branche du
  site.
- **Le ton suit le français** : tutoiement sur `sweyl.com` (*you*, *tú*), vouvoiement sur le Pro
  (*you*, *usted*). Les marques ne se traduisent pas (Sweyl, Pro), les divisions françaises non
  plus (PN, N3…), ni le nom du système du hero (Spain pick and roll).
- **Langue d'arrivée** : `?lang=fr|en|es` dans l'adresse, puis le choix mémorisé, puis le navigateur.
  Le lien envoyé après une démo en espagnol est `https://pro.sweyl.com/?lang=es`. Le choix vit dans
  un **cookie `sweyl-language` posé sur `sweyl.com`**, jamais dans `localStorage` : celui-ci est
  propre à chaque sous-domaine, et l'anglais choisi sur `sweyl.com` retombait en français sur
  `pro.sweyl.com`. Le thème suit la même règle (`sweyl-theme`) : **toute préférence du visiteur
  passe par `src/lib/sharedCookie.js`**.
- **Textes longs** (mentions légales, futurs articles) : un fichier par langue
  (`mentions-legales.en.md`), jamais dans le classeur. Une nouvelle langue de ce fichier s'ajoute
  aussi à l'exclusion de réécriture de `vercel.json`.
- **Les balises d'aperçu de lien (`index.html`, `pro.html`) restent en français** : elles sont lues
  sans JavaScript. Les captures d'écran restent en français dans les trois langues (*arbitrage
  d'Ismail, 20/10/2026*) : elles ne se refont pas par langue.
- **Le mail de demande de démo reste en français** ; il porte une ligne « Langue » quand la page
  n'était pas en français.
