import { useRef, useEffect } from 'react'

export default function SoundRipples({ playing = false }) {
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

      const centerX = w * 0.5
      const centerY = h * 0.5

      // draw multiple concentric ripples
      const maxR = Math.max(w, h) * 0.9
      const count = 5
      for (let i = 0; i < count; i++) {
        const phase = (t * 0.6 + i * 40) % (maxR + 200)
        const r = (phase / (maxR + 200)) * maxR
        const progress = r / maxR
        const alpha = Math.max(0, (1 - progress) * (playing ? 0.42 : 0.12))
        ctx.beginPath()
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(124,58,237, ${alpha})`
        ctx.lineWidth = 2 + (1 - progress) * 4
        ctx.stroke()
      }

      // center pulse
      ctx.beginPath()
      const baseRadius = playing ? 28 + Math.abs(Math.sin(t * 0.06) * 12) : 12
      ctx.fillStyle = playing ? 'rgba(99,102,241,0.9)' : 'rgba(99,102,241,0.4)'
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2)
      ctx.fill()

      t += playing ? 4 : 1
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [playing])

  return (
    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
