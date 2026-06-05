# Scroll-driven stacked cards pattern

Pile de cartes qui s'empile en haut au fur et à mesure du scroll. Référence d'implémentation : `src/components/sections/ForWho.jsx`.

## Intention visuelle

- Au démarrage : seule la 1ère carte est visible en haut, la 2ème peek juste en dessous (prête à monter)
- Pendant le scroll : chaque carte monte depuis "juste sous la précédente" jusqu'à son slot dans la pile en haut
- Les cartes déjà arrivées rétrécissent progressivement pour laisser deviner leur top (effet de profondeur)
- À la fin de l'animation : la pile reste figée le temps d'un instant, puis l'ensemble scroll comme un bloc unique vers la section suivante

## Pourquoi pas `position: sticky` par carte

C'est l'erreur naturelle. Avec `sticky` sur chaque carte :
- Chaque carte a sa propre condition d'épinglage **et de désépinglage** (`containing_block.bottom < top + height`)
- Les cartes se désépinglent à des moments différents → à la fin, la dernière carte "passe par-dessus" les autres déjà en train de scroller
- Aucun `TAIL_SCROLL` ne corrige vraiment ça, ça ne fait que déplacer le problème

**On a perdu ~4h à tenter sticky-par-carte sous toutes ses formes (CSS, framer-motion, view-timeline natif). Ne pas refaire.**

## L'architecture qui marche

```
<section ref={sceneRef} height: 300vh>           ← provides scroll room
  <div sticky top: headerH; height: calc(100vh - headerH)>   ← UN seul sticky
    <motion.div absolute top: 0           />     ← carte 0 (toujours à son slot)
    <motion.div absolute top: PEEK        />     ← carte 1 (slide depuis sous carte 0)
    <motion.div absolute top: 2*PEEK      />     ← carte 2 (slide depuis sous carte 1)
    <motion.div absolute top: 3*PEEK      />     ← carte 3 (slide depuis sous carte 2)
  </div>
</section>
```

Clés :
- **Un seul élément sticky** englobant pas de sticky par carte
- **Cartes en `position: absolute`** à leur slot final (`top: i * PEEK`), elles ne sont jamais en flow
- **Animation pilotée par `useScroll` framer-motion** sur la section externe → `scrollYProgress` (0 → 1) sur toute la durée du scroll de la section
- Quand la section finit, le sticky se libère **d'un coup** → toute la pile scroll ensemble, pas de carte qui passe par-dessus

## Timing des arrivées

Pour `N` cartes :

- **Carte 0** : à son slot dès `progress = 0`, pas d'animation d'entrée
- **Cartes 1 à N-1** se partagent la timeline équitablement (`1/(N-1)` chacune), sans trou :
  - Carte i arrive pendant `[(i-1)/(N-1), i/(N-1)]`
  - Dès que carte i finit (au slot), carte i+1 commence pile à ce moment

**Trou entre arrivées = mauvais (dead scroll). Le user le perçoit immédiatement.**

## Animation Y en trois phases (le truc clé)

Si on positionne juste la carte i à `popInY` (juste sous la précédente) dès `progress = 0` et qu'on slide pendant son arrivée, on voit toutes les cartes futures empilées en bas de l'écran avant leur tour. **Le user déteste ça.**

Solution : `useTransform` multi-points avec un saut instantané.

```js
const popInY = prevHeight + ARRIVAL_GAP - PEEK   // ≈ H_prev - 33
const HIDDEN_Y = 3000                            // pixels far below viewport

const y = useTransform(
  progress,
  i === 0 ? [0, 1] : [arrivalStart - 0.001, arrivalStart, arrivalEnd],
  i === 0 ? [0, 0] : [HIDDEN_Y, popInY, 0]
)
```

Phases pour carte i ≥ 1 :
1. **Avant** son tour (`progress < arrivalStart`) : `y = HIDDEN_Y` → carte invisible loin sous l'écran
2. **Snap** à `arrivalStart` : transition de `HIDDEN_Y` à `popInY` sur 0.001 de progress (≈ instantané)
3. **Slide** sur `[arrivalStart, arrivalEnd]` : de `popInY` à 0 → la carte monte jusqu'à son slot

Le snap instantané évite l'effet de transparence/fondu que le user a explicitement refusé.

## Maths du `popInY`

Carte i doit apparaître à 15-20px sous le slot de la carte précédente :

```
visual_top_i_au_pop = (i-1) * PEEK + H_(i-1) + ARRIVAL_GAP
slot_top_i           = i * PEEK

popInY_natural = visual_top_au_pop - slot_top
               = H_(i-1) + ARRIVAL_GAP - PEEK
```

Avec `PEEK = 48`, `ARRIVAL_GAP = 15`, `H_(i-1) ≈ 600` → `popInY ≈ 567`.

**`prevHeight` doit être mesuré dynamiquement** (les hauteurs varient selon le contenu) :
- `ResizeObserver` sur la `motion.div` interne (`cardRef`)
- State `cardHeights[]` au niveau du parent
- Re-render quand les hauteurs changent → `popInY` recalculé

### Dissociation mobile / desktop pour le `popInY`

Sur mobile (cartes ≈ 75% du viewport), `popInY_natural` place la carte près du bas du viewport pop-in invisible. Sur desktop (cartes ≈ 50-60% du viewport), `popInY_natural` la place en plein milieu de l'écran → pop visible et bizarre.

**Ne pas tenter de formule unifiée (genre `Math.max`)** : ça change subtilement le comportement mobile et casse le feel qu'on avait validé. Tout pont entre les deux logiques cause des régressions.

Solution : `popInY` calculé dans `ForWho` (au niveau parent), avec une branche `if (mobile)` complètement isolée. `AnimatedCard` ne reçoit que la valeur finale en prop.

```js
if (mobile) {
  popInY = prevHeight + ARRIVAL_GAP - PEEK              // just below previous card
} else {
  popInY = viewportH - headerH - i*PEEK - POP_PEEK_FROM_BOTTOM   // 90px above viewport bottom
}
```

Le desktop nécessite de mesurer `window.innerHeight` (state `viewportH` + listener `resize`). Le mobile n'en a pas besoin.

## Animation scale

```js
const targetScale = Math.max(0.5, 1 - (N - i - 1) * 0.1)
// Carte 0 : 0.7, Carte 1 : 0.8, Carte 2 : 0.9, Carte 3 : 1.0
const scale = useTransform(progress, [arrivalEnd, 1], [1, targetScale])
```

- `transformOrigin: 'top'` → la carte rétrécit vers le haut, son top reste à sa place
- Une carte commence à rétrécir une fois arrivée à son slot
- La dernière carte ne rétrécit pas (`targetScale = 1`)

## Constantes à connaître

```js
const PEEK = 48              // px visibles du haut de chaque carte précédente dans la pile finale
const ARRIVAL_GAP = 15       // px entre le bas de la carte précédente et le top de la carte qui arrive
const HIDDEN_Y = 3000        // px assez grand pour cacher la carte hors écran
const SCROLL_HEIGHT_VH = 75 * N   // hauteur totale de la section ; règle la durée du scroll
```

## Pièges à éviter (testés et confirmés mauvais)

1. **`opacity` 0→1 pour l'arrivée** → le user voit un fondu transparent et déteste
2. **`translateY: '100vh'` initial** → la carte arrive depuis le bas de l'écran, le user veut "depuis sous la carte précédente"
3. **`startY = H_prev - 33` sans phase cachée** → toutes les cartes en attente s'affichent en pile-preview en bas
4. **Sticky par carte (toutes variantes)** → carte 4 passe par-dessus à la fin
5. **`view-timeline` CSS pur sans sticky englobant** → mêmes problèmes que sticky par carte
6. **Lenis pour la fluidité** → modifie le scroll feel des autres sections de la page
7. **Trou entre les fenêtres d'arrivée** → le user perçoit ça comme du dead scroll

## Browser support

- `framer-motion` `useScroll` / `useTransform` : tous navigateurs modernes (basé sur le scroll listener JS)
- Pas de dépendance à `view-timeline` (qui est limité Chrome/Edge/Safari 26+)
