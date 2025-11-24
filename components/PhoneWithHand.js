import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function PhoneWithHand({ flash = false, playing = false, playingStartedAt = null }) {
  const [showQR, setShowQR] = useState(false)
  // use CSS transition for smooth fade-in of bars when `playing` becomes true
  const barsStyle = { opacity: playing ? 1 : 0, transition: 'opacity 900ms ease' }

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
    <div
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
              {/* QR background */}
              <rect x="8" y="8" width="84" height="84" rx="4" fill="#fff" />

              {/* QR Data Pattern - Abstract representation */}
              <g fill="#1f2937" opacity="0.9">
                {/* Top Left Finder */}
                <path d="M14 14h20v20h-20z M18 18v12h12v-12z M20 20h8v8h-8z" />
                {/* Top Right Finder */}
                <path d="M66 14h20v20h-20z M70 18v12h12v-12z M72 20h8v8h-8z" />
                {/* Bottom Left Finder */}
                <path d="M14 66h20v20h-20z M18 70v12h12v-12z M20 72h8v8h-8z" />

                {/* Data Bits - Random-looking pattern */}
                <path d="
                  M40 14h4v4h-4z M48 14h4v4h-4z M56 14h4v4h-4z
                  M38 22h4v4h-4z M46 22h4v4h-4z M54 22h4v4h-4z M60 22h4v4h-4z
                  M14 40h4v4h-4z M22 40h4v4h-4z M30 40h4v4h-4z M40 40h4v4h-4z M50 40h4v4h-4z M60 40h4v4h-4z M70 40h4v4h-4z M80 40h4v4h-4z
                  M14 48h4v4h-4z M26 48h4v4h-4z M38 48h4v4h-4z M50 48h4v4h-4z M62 48h4v4h-4z M74 48h4v4h-4z
                  M40 56h4v4h-4z M48 56h4v4h-4z M56 56h4v4h-4z
                  M40 66h4v4h-4z M50 66h4v4h-4z M60 66h4v4h-4z
                  M40 74h4v4h-4z M48 74h4v4h-4z M56 74h4v4h-4z
                  M70 70h4v4h-4z M80 70h4v4h-4z
                  M70 78h4v4h-4z M80 78h4v4h-4z
                " />
              </g>

              {/* scan line */}
              <rect x="10" y="10" width="80" height="6" fill="#60a5fa" opacity="0.18">
                <animate attributeName="y" from="10" to="86" dur="1.2s" repeatCount="indefinite" />
              </rect>
              {/* small pop effect */}
              <g>
                <animateTransform attributeName="transform" type="scale" values="0.86;1.02;1" dur="0.6s" begin="0s" repeatCount="1" />
              </g>
            </g>

            {/* subtle animated indicator when playing: small bars (centered & flipped) */}
            <g transform="translate(50,132) rotate(180)" style={barsStyle}>
              <rect x="-10" y="0" width="6" height="18" rx="2" fill="#000">
                <animate attributeName="height" values="8;22;8" dur="0.9s" repeatCount="indefinite" />
              </rect>
              <rect x="-2" y="0" width="6" height="26" rx="2" fill="#000">
                <animate attributeName="height" values="10;28;10" dur="1s" repeatCount="indefinite" />
              </rect>
              <rect x="6" y="0" width="6" height="20" rx="2" fill="#000">
                <animate attributeName="height" values="6;22;6" dur="0.8s" repeatCount="indefinite" />
              </rect>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
