import { useRef, useEffect } from 'react'

export default function SoundWave({ playing = false }) {
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
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
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

      const layers = 4
      for (let i = 0; i < layers; i++) {
        const progress = i / (layers - 1)
        const alpha = 0.14 * (1 - progress) + 0.02
        const amp = (playing ? 48 : 12) * (1 - progress * 0.6)
        ctx.beginPath()
        const mid = h / 2
        ctx.moveTo(0, mid)
        for (let x = 0; x <= w; x += 2) {
          const freq = 0.008 + progress * 0.014
          const y = mid + Math.sin(x * freq + t * (0.02 + progress * 0.01)) * (amp * Math.sin(t * 0.0006 + i))
          ctx.lineTo(x, y)
        }
        const r = Math.round(255 - 80 * progress)
        const g = Math.round(120 + 100 * progress)
        const b = Math.round(200 - 80 * progress)
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.lineWidth = 2 + (1 - progress) * 2
        ctx.stroke()
      }

      // subtle glow overlay
      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = `rgba(99,102,241,0.02)`
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'

      t += 1 + (playing ? 2 : 0)
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [playing])

  return (
    <div className="w-full h-72 md:h-96 rounded-xl overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
