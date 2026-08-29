import React from 'react'
import { useTheme } from '../contexts/theme'
import { shotFor, SHOT_SIZE } from '../lib/appShots'

/**
 * Une capture de l'app, dans un cadre iPhone, fond transparent.
 * L'image suit le thème du site. `width` est la largeur CSS souhaitée.
 */
export default function AppShot({ slot, width, priority = false, style }) {
  const { theme } = useTheme()
  const shot = shotFor(slot)
  const ratio = SHOT_SIZE.h / SHOT_SIZE.w

  return (
    <img
      src={`/assets/app/${shot.name}_${theme}.webp`}
      alt={shot.alt}
      width={SHOT_SIZE.w}
      height={SHOT_SIZE.h}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable="false"
      style={{
        width,
        height: 'auto',
        aspectRatio: `${SHOT_SIZE.w} / ${SHOT_SIZE.h}`,
        display: 'block',
        userSelect: 'none',
        // Ombre adoucie en thème clair : 0.45 tache sur un fond #f6f7f8.
        filter: theme === 'light'
          ? 'drop-shadow(0 22px 40px rgba(15,20,28,0.18))'
          : 'drop-shadow(0 28px 50px rgba(0,0,0,0.45))',
        ...style,
      }}
    />
  )
}

export { SHOT_SIZE }
