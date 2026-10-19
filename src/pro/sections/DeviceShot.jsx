import React from 'react'
import { useTheme } from '../../contexts/theme'
import { useMobile } from '../../hooks/useMobile'
import { COPY } from '../copy'
import { DEVICE, DEVICE_SIZE, READY, shotKey, shotSrc } from '../proShots'

/**
 * Une capture dans son cadre (ordinateur, tablette ou téléphone), qui suit le thème.
 * Sur mobile, un tap sur une tablette ou un ordinateur l'ouvre en plein écran : à 350 px,
 * une tablette paysage se voit mais ne se lit pas.
 */
export default function DeviceShot({ shot, device }) {
  const { theme } = useTheme()
  const mobile = useMobile()
  const dialogRef = React.useRef(null)
  const size = DEVICE_SIZE[device]
  const alt = COPY.shotsAlt[shot]
  const ready = READY.has(shotKey(shot, device))
  const zoomable = mobile && ready && device !== DEVICE.phone

  const image = ready ? (
    <img
      className="pro-shot-img pro-shot-img--shadow" src={shotSrc(shot, device, theme)} alt={alt}
      width={size.w} height={size.h} loading="lazy" decoding="async" draggable="false"
    />
  ) : (
    <div className="placeholder pro-shot-ph" style={{ aspectRatio: `${size.w} / ${size.h}` }} role="img" aria-label={alt}>
      <span className="label">{shot} · {device}</span>
    </div>
  )

  if (!zoomable) return image

  return (
    <>
      <button type="button" className="pro-zoom-btn" onClick={() => dialogRef.current?.showModal()}>{image}</button>
      <dialog ref={dialogRef} className="pro-zoom" onClick={() => dialogRef.current?.close()}>
        <div className="pro-zoom-inner">
          <img src={shotSrc(shot, device, theme)} alt={alt} width={size.w} height={size.h} />
          <span className="pro-zoom-close">{COPY.zoomClose}</span>
        </div>
      </dialog>
    </>
  )
}
