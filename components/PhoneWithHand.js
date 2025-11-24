import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function PhoneWithHand({ flash = false, playing = false }) {
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    let tShow = null
    let tHide = null
    if (flash) {
      // delay the QR so the hand has time to come over
      tShow = setTimeout(() => setShowQR(true), 600)
      tHide = setTimeout(() => setShowQR(false), 600 + 1400)
    } else {
      setShowQR(false)
    }
    return () => {
      if (tShow) clearTimeout(tShow)
      if (tHide) clearTimeout(tHide)
    }
  }, [flash])

  return (
    <motion.div
      initial={{ y: 20, opacity: 0, rotate: 0 }}
      animate={flash ? { y: 6, opacity: 1, rotate: -4 } : { y: 0, opacity: 1, rotate: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ transformOrigin: 'center' }}
      className="w-72 h-96 flex items-end justify-center phone-wrap"
    >
      <svg viewBox="0 0 240 320" width="240" height="320" className="drop-shadow-2xl">
        {/* hand animated: comes from above when flash is true */}
        <motion.g transform="translate(10,40)" initial={{ y: -40, rotate: -8 }} animate={flash ? { y: 0, rotate: 0 } : { y: -40, rotate: -8 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
          <path d="M20 200 q40 -60 70 -40 q30 20 50 -10 q10 -20 20 -12 q-6 40 -10 64 q-24 34 -130 38 z" fill="#f2d6c9" opacity="0.95" />
        </motion.g>

        {/* phone body */}
        <g transform="translate(40,18)">
          <rect x="20" y="18" rx="18" ry="18" width="120" height="200" fill="#0b1020" stroke="#111827" strokeWidth="2" />
          <rect x="30" y="30" rx="12" ry="12" width="100" height="160" fill="#f8fafc" />

          {/* screen content: QR or waves */}
          <g transform="translate(30,30)">
            <rect width="100" height="160" rx="12" fill="#000" opacity="0.04" />

            {/* QR placeholder squares (visible when showQR) */}
            <g style={{ opacity: showQR ? 1 : 0, transition: 'opacity 300ms ease' }}>
              <rect x="10" y="10" width="20" height="20" fill="#000" />
              <rect x="70" y="10" width="20" height="20" fill="#000" />
              <rect x="10" y="70" width="20" height="20" fill="#000" />
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
              <rect x="-20" y="0" width="4" height={playing ? 18 : 8} rx="2" fill="#000">
                <animate attributeName="height" values="8;22;8" dur="0.9s" repeatCount="indefinite" />
              </rect>
              <rect x="-8" y="0" width="4" height={playing ? 26 : 10} rx="2" fill="#000">
                <animate attributeName="height" values="10;28;10" dur="1s" repeatCount="indefinite" />
              </rect>
              <rect x="4" y="0" width="4" height={playing ? 20 : 6} rx="2" fill="#000">
                <animate attributeName="height" values="6;22;6" dur="0.8s" repeatCount="indefinite" />
              </rect>
            </g>
          </g>
        </g>
      </svg>
    </motion.div>
  )
}
