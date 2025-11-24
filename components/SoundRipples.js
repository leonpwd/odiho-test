import { useRef, useEffect } from 'react'

export default function SoundRipples({ playing = false, className = 'w-full h-full', flipped = false, playingStartedAt = null }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = null
    const dpr = window.devicePixelRatio || 1

    function resize() {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    let t = 0
    function draw() {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      ctx.clearRect(0, 0, w, h)
      // if not playing, keep canvas blank until playing becomes true
      if (!playing) {
        t += 1
        raf = requestAnimationFrame(draw)
        return
      }

      // compute fade alpha based on playingStartedAt if provided
      let fadeAlpha = 1
      const fadeDuration = 800 // ms
      if (playingStartedAt) {
        const elapsed = Date.now() - playingStartedAt
        fadeAlpha = Math.min(1, Math.max(0, elapsed / fadeDuration))
      }

      // compute centers
      const centerX = w * 0.5
      const centerY = h * 0.5

      // compute fade alpha and apply globally to the whole drawing so strokes and center pulse fade in
      ctx.save()
      ctx.globalAlpha = fadeAlpha

      // draw multiple concentric ripples
      const maxR = Math.max(w, h) * 0.75
      const count = 5
      if (flipped) {
        // rotate around the center so flipping keeps the ripples centered
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(Math.PI)
        for (let i = 0; i < count; i++) {
          const phase = (t * 0.6 + i * 40) % (maxR + 200)
          const r = (phase / (maxR + 200)) * maxR
          const progress = r / maxR
          const alpha = Math.max(0, (1 - progress) * 0.42)
          ctx.beginPath()
          ctx.arc(0, 0, r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(124,58,237, ${alpha})`
          ctx.lineWidth = 2 + (1 - progress) * 4
          ctx.stroke()
        }
        // center pulse
        ctx.beginPath()
        const baseRadiusF = 28 + Math.abs(Math.sin(t * 0.06) * 12)
        ctx.fillStyle = 'rgba(99,102,241,0.9)'
        ctx.arc(0, 0, baseRadiusF, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      } else {
        for (let i = 0; i < count; i++) {
          const phase = (t * 0.6 + i * 40) % (maxR + 200)
          const r = (phase / (maxR + 200)) * maxR
          const progress = r / maxR
          const alpha = Math.max(0, (1 - progress) * 0.42)
          ctx.beginPath()
          ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(124,58,237, ${alpha})`
          ctx.lineWidth = 2 + (1 - progress) * 4
          ctx.stroke()
        }
        // center pulse
        ctx.beginPath()
        const baseRadius = 28 + Math.abs(Math.sin(t * 0.06) * 12)
        ctx.fillStyle = 'rgba(99,102,241,0.9)'
        ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()

      // apply radial fade mask so waves gracefully fade toward edges (avoid rectangular cutoff)
      const grd = ctx.createRadialGradient(centerX, centerY, Math.max(0, maxR * 0.2), centerX, centerY, Math.max(1, maxR))
      grd.addColorStop(0, 'rgba(0,0,0,1)')
      grd.addColorStop(0.4, 'rgba(0,0,0,0.5)')
      grd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.globalCompositeOperation = 'destination-in'
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'

      t += 4

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [playing, playingStartedAt, flipped])

  return (
    <div className={`${className} rounded-xl pointer-events-none`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
