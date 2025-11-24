import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function PhoneWithHand({ flash = false, playing = false }) {
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    if (flash) {
      // flash sequence: show QR briefly
      setShowQR(true)
      const t = setTimeout(() => setShowQR(false), 1400)
      return () => clearTimeout(t)
    }
  }, [flash])

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-72 h-96 flex items-end justify-center"
    >
      <svg viewBox="0 0 240 320" width="240" height="320" className="drop-shadow-2xl">
        {/* hand */}
        <g transform="translate(10,40)">
          <path d="M20 200 q40 -60 70 -40 q30 20 50 -10 q10 -20 20 -12 q-6 40 -10 64 q-24 34 -130 38 z" fill="#f2d6c9" opacity="0.95" />
        </g>

        {/* phone body */}
        <g transform="translate(40,18)">
          <rect x="20" y="18" rx="18" ry="18" width="120" height="200" fill="#0b1020" stroke="#111827" strokeWidth="2" />
          <rect x="30" y="30" rx="12" ry="12" width="100" height="160" fill="#081028" />

          {/* screen content: QR or waves */}
          <g transform="translate(30,30)">
            <rect width="100" height="160" rx="12" fill="#000" opacity="0.04" />

            {/* QR placeholder squares (visible when showQR) */}
            <g style={{ opacity: showQR ? 1 : 0, transition: 'opacity 300ms ease' }}>
              <rect x="10" y="10" width="20" height="20" fill="#fff" />
              <rect x="70" y="10" width="20" height="20" fill="#fff" />
              <rect x="10" y="70" width="20" height="20" fill="#fff" />
              {/* random QR pattern */}
              <g fill="#fff">
                <rect x="40" y="40" width="8" height="8" />
                <rect x="58" y="40" width="8" height="8" />
                <rect x="76" y="40" width="8" height="8" />
                <rect x="40" y="58" width="8" height="8" />
                <rect x="58" y="58" width="8" height="8" />
                <rect x="76" y="58" width="8" height="8" />
              </g>
            </g>

            {/* subtle animated indicator when playing: small bars */}
            <g transform="translate(50,118)" opacity={playing ? 1 : 0.25}>
              <rect x="-20" y="0" width="4" height={playing ? 18 : 8} rx="2" fill="#60a5fa">
                <animate attributeName="height" values="8;22;8" dur="0.9s" repeatCount="indefinite" />
              </rect>
              <rect x="-8" y="0" width="4" height={playing ? 26 : 10} rx="2" fill="#7c3aed">
                <animate attributeName="height" values="10;28;10" dur="1s" repeatCount="indefinite" />
              </rect>
              <rect x="4" y="0" width="4" height={playing ? 20 : 6} rx="2" fill="#34d399">
                <animate attributeName="height" values="6;22;6" dur="0.8s" repeatCount="indefinite" />
              </rect>
            </g>
          </g>
        </g>
      </svg>
    </motion.div>
  )
}
