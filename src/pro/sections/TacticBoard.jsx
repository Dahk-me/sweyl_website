import React from 'react'
import { PLAY } from '../play'
import { COPY } from '../copy'

/**
 * Le demi-terrain se trace à l'arrivée, puis le système se joue en boucle comme sur un
 * tableau de coach. SVG pur, un seul requestAnimationFrame, aucune bibliothèque.
 * Pause hors écran et onglet caché ; mouvement réduit : le schéma final, figé.
 */
const NS = 'http://www.w3.org/2000/svg'
const PLAYER_OFFSET = [13, 11] // le ballon se tient à la main droite du porteur

function el(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag)
  for (const a in attrs) e.setAttribute(a, attrs[a])
  if (parent) parent.appendChild(e)
  return e
}
const same = (a, b) => a && b && a[1] === b[1] && a[2] === b[2]

// Position interpolée, adoucie au départ et à l'arrêt.
function pos(k, t) {
  if (t <= k[0][0] || k.length === 1) return [k[0][1], k[0][2]]
  const last = k[k.length - 1]
  if (t >= last[0]) return [last[1], last[2]]
  for (let i = 0; i < k.length - 1; i++) {
    if (t <= k[i + 1][0]) {
      const a = k[i], b = k[i + 1]
      let p = (t - a[0]) / (b[0] - a[0])
      const easeIn = i === 0 || same(k[i - 1], a)
      const easeOut = i + 2 >= k.length || same(b, k[i + 2])
      if (easeIn && easeOut) p = p * p * (3 - 2 * p)
      else if (easeIn) p = p * p
      else if (easeOut) p = 1 - (1 - p) * (1 - p)
      return [a[1] + (b[1] - a[1]) * p, a[2] + (b[2] - a[2]) * p]
    }
  }
  return [last[1], last[2]]
}

function trailPath(tr, t) {
  const k = PLAY.off[tr.who].k, end = Math.min(t, tr.t1), pts = []
  for (let s = tr.t0; s <= end + 1e-6; s += 0.02) pts.push(pos(k, s))
  if (pts.length < 2) return ''
  if (tr.type !== 'dribble') return 'M' + pts.map(q => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join('L')
  // Dribble : une onde perpendiculaire à la course, comme au feutre.
  let d = 0
  const out = []
  for (let i = 0; i < pts.length; i++) {
    const j = Math.min(i + 1, pts.length - 1), h = Math.max(i - 1, 0)
    const dx = pts[j][0] - pts[h][0], dy = pts[j][1] - pts[h][1], len = Math.hypot(dx, dy) || 1
    if (i > 0) d += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
    const off = Math.sin(d / 6) * 5
    out.push((pts[i][0] - dy / len * off).toFixed(1) + ' ' + (pts[i][1] + dx / len * off).toFixed(1))
  }
  return 'M' + out.join('L')
}

// L'écran : une barre perpendiculaire au bout de la course.
function screenBar(tr) {
  const k = PLAY.off[tr.who].k, b = pos(k, tr.t1), a = pos(k, tr.t1 - 0.15)
  const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len
  const cx = b[0] + ux * 21, cy = b[1] + uy * 21
  return `M${(cx - uy * 14).toFixed(1)} ${(cy + ux * 14).toFixed(1)}L${(cx + uy * 14).toFixed(1)} ${(cy - ux * 14).toFixed(1)}`
}

function mountPlay(svg) {
  const layer = el('g', {}, svg)
  const trails = PLAY.trails.map(tr => {
    const g = el('g', {}, layer)
    return { tr, line: el('path', { class: 'pro-trail' }, g), bar: tr.screen ? el('path', { class: 'pro-screen', d: screenBar(tr) }, g) : null }
  })
  const passLine = el('path', { class: 'pro-pass' }, layer)
  const shotLine = el('path', { class: 'pro-shot' }, layer)
  const defs = {}, offs = {}
  Object.keys(PLAY.def).forEach(id => {
    const g = el('g', {}, layer)
    el('path', { class: 'pro-x', d: 'M-10 -10L10 10M10 -10L-10 10' }, g)
    defs[id] = g
  })
  Object.keys(PLAY.off).forEach(id => {
    const g = el('g', {}, layer)
    el('circle', { class: 'pro-o', r: 17 }, g)
    el('text', { class: 'pro-o-label', x: 0, y: 5, 'text-anchor': 'middle' }, g).textContent = PLAY.off[id].n
    offs[id] = g
  })
  const ball = el('circle', { class: 'pro-ball', r: 7 }, layer)
  const three = el('text', { class: 'pro-three', x: 392, y: 70 }, layer)
  three.textContent = '+3'
  const hand = (id, t) => { const q = pos(PLAY.off[id].k, t); return [q[0] + PLAYER_OFFSET[0], q[1] + PLAYER_OFFSET[1]] }

  const draw = (t) => {
    const F = PLAY.fadeOut, I = PLAY.fadeIn
    let op = 1
    if (t >= F[0] && t < F[1]) op = 1 - (t - F[0]) / (F[1] - F[0])
    else if (t >= F[1] && t < I[0]) op = 0
    else if (t >= I[0] && t < I[1]) op = (t - I[0]) / (I[1] - I[0])
    const tt = t >= F[1] ? 0 : t
    layer.style.opacity = op

    for (const id in offs) { const q = pos(PLAY.off[id].k, tt); offs[id].setAttribute('transform', `translate(${q[0].toFixed(1)} ${q[1].toFixed(1)})`) }
    for (const id in defs) { const q = pos(PLAY.def[id].k, tt); defs[id].setAttribute('transform', `translate(${q[0].toFixed(1)} ${q[1].toFixed(1)})`) }
    trails.forEach(o => {
      o.line.setAttribute('d', tt > o.tr.t0 ? trailPath(o.tr, tt) : '')
      if (o.bar) o.bar.style.opacity = tt >= o.tr.t1 ? 1 : 0
    })

    const P = PLAY.pass, S = PLAY.shot
    let b, r = 7, bo = 1
    if (tt < P.t0) { b = hand(P.from, tt); r = 6.5 + 1.2 * Math.abs(Math.sin(tt * Math.PI * 3)) }
    else if (tt < P.t1) { const p = (tt - P.t0) / (P.t1 - P.t0), a = hand(P.from, P.t0), c = hand(P.to, P.t1); b = [a[0] + (c[0] - a[0]) * p, a[1] + (c[1] - a[1]) * p] }
    else if (tt < S.t0) b = hand(S.by, tt)
    else if (tt < S.t1) { const s = (tt - S.t0) / (S.t1 - S.t0), a = hand(S.by, S.t0); b = [a[0] + (S.rim[0] - a[0]) * s, a[1] + (S.rim[1] - a[1]) * s]; r = 7 * (1 + 0.9 * Math.sin(Math.PI * s)) }
    else { b = S.rim; bo = Math.max(0, 1 - (tt - S.t1) / 0.5) }
    ball.setAttribute('cx', b[0].toFixed(1)); ball.setAttribute('cy', b[1].toFixed(1)); ball.setAttribute('r', r.toFixed(2)); ball.style.opacity = bo

    if (tt > P.t0) { const a = hand(P.from, P.t0), e = tt < P.t1 ? b : hand(P.to, P.t1); passLine.setAttribute('d', `M${a[0]} ${a[1]}L${e[0].toFixed(1)} ${e[1].toFixed(1)}`) } else passLine.setAttribute('d', '')
    if (tt > S.t0) { const a = hand(S.by, S.t0), e = tt < S.t1 ? b : S.rim; shotLine.setAttribute('d', `M${a[0]} ${a[1]}L${e[0].toFixed(1)} ${e[1].toFixed(1)}`) } else shotLine.setAttribute('d', '')
    three.style.opacity = tt > S.t1 ? Math.min(1, (tt - S.t1) / 0.3) : 0
  }
  return { draw, unmount: () => layer.remove() }
}

export default function TacticBoard() {
  const wrapRef = React.useRef(null)
  const svgRef = React.useRef(null)

  React.useEffect(() => {
    const { draw, unmount } = mountPlay(svgRef.current)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { draw(PLAY.frozenAt); return unmount }

    let acc = 0, last = null, visible = true, raf = 0
    const io = new IntersectionObserver(es => { visible = es.some(e => e.isIntersecting) })
    io.observe(wrapRef.current)
    const frame = (now) => {
      if (last === null) last = now
      const dt = (now - last) / 1000
      last = now
      // Le temps du système ne s'écoule que visible : pas de saut au retour.
      if (visible && !document.hidden) {
        acc += Math.min(dt, 0.1)
        // Le terrain se trace en temps réel, le système se joue à PLAY.speed.
        draw(acc < PLAY.start ? 0 : ((acc - PLAY.start) * PLAY.speed) % PLAY.period)
      }
      raf = requestAnimationFrame(frame)
    }
    draw(0)
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); io.disconnect(); unmount() }
  }, [])

  return (
    <div className="pro-board" ref={wrapRef} aria-hidden="true">
      <svg viewBox="0 0 720 620" ref={svgRef}>
        <g>
          <rect className="pro-court hero-line" pathLength="1" x="10" y="10" width="700" height="600" />
          <rect className="pro-court hero-line" pathLength="1" x="270" y="10" width="180" height="260" />
          <circle className="pro-court hero-line" pathLength="1" cx="360" cy="270" r="90" />
          <path className="pro-court hero-line" pathLength="1" d="M60 10V150A300 300 0 0 0 660 150V10" />
          <circle className="pro-court hero-line" pathLength="1" cx="360" cy="62" r="14" />
          <path className="pro-court hero-line" pathLength="1" d="M320 40H400" />
          <path className="pro-court hero-line" pathLength="1" d="M300 610A60 60 0 0 1 420 610" />
        </g>
      </svg>
      <div className="pro-board-caption">{COPY.play.caption}</div>
    </div>
  )
}
