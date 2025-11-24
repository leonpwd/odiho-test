import Head from 'next/head'
import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Header from '../components/Header'
import PhoneWithHand from '../components/PhoneWithHand'
import SoundRipples from '../components/SoundRipples'

export default function Home() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [flash, setFlash] = useState(false)
  const [playingStartedAt, setPlayingStartedAt] = useState(null)

  const handleMainAction = async () => {
    if (!audioRef.current) return

    if (playing) {
      // Stop everything
      audioRef.current.pause()
      setPlaying(false)
      setFlash(false)
    } else {
      // Restart sequence: Hand leaves (if present) -> Hand enters -> QR -> Sound
      setFlash(false)
      setPlaying(false)

      // Small delay to let the hand reset/leave if it was there
      setTimeout(() => {
        setFlash(true)
        // Wait for hand animation + QR delay before starting sound
        setTimeout(async () => {
          try {
            await audioRef.current.play()
            setPlaying(true)
            setPlayingStartedAt(Date.now())
          } catch (e) {
            console.warn('Play blocked', e)
          }
        }, 1400) // 600ms (hand) + 800ms (QR scan effect)
      }, 300)
    }
  }

  // Auto sequence on page load: hand comes, QR appears, then start sound animation
  useEffect(() => {
    const startDelay = 500
    const qrAppearDelay = 600
    const playAfter = 1200

    const t1 = setTimeout(() => setFlash(true), startDelay)
    const t2 = setTimeout(() => {
      setPlaying(true)
      setPlayingStartedAt(Date.now())
    }, startDelay + qrAppearDelay + playAfter)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Odiho — L'expérience live augmentée</title>
        <meta name="description" content="Vivez l'événement avec le son en haute définition, directement sur votre mobile." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen relative bg-white overflow-x-hidden">
        {/* Background decorative blobs */}
        <div className="blob w-96 h-96 bg-emerald-100/50 rounded-full -top-20 -left-20 animate-float blur-3xl" style={{ position: 'absolute' }} />
        <div className="blob w-96 h-96 bg-indigo-100/50 rounded-full top-1/2 -right-20 animate-slowSpin blur-3xl" style={{ position: 'absolute' }} />

        <div className="container mx-auto px-6 py-6 md:py-12 relative z-10 min-h-screen flex flex-col md:justify-center">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                <h1 className="text-5xl md:text-8xl font-black leading-tight tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                    Odiho
                  </span>
                  <span className="text-emerald-500">.</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.12 }}
                className="mt-4 md:mt-6 text-lg md:text-2xl text-gray-600 font-medium max-w-lg leading-relaxed"
              >
                L'évènement. <span className="text-gray-900 font-bold">Directement sur votre téléphone.</span>
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24 }} className="mt-6 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <button
                  onClick={handleMainAction}
                  className={`group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 ${playing ? 'bg-gray-900 text-white' : 'bg-emerald-400 text-gray-900'}`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {playing ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>
                        Arrêter
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Vivre l'expérience
                      </>
                    )}
                  </span>
                  {!playing && <div className="absolute inset-0 rounded-2xl bg-white/20 blur-md group-hover:blur-lg transition-all" />}
                </button>

                <div className="flex items-center gap-3 text-sm font-semibold text-gray-500">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  Zéro latence
                </div>
              </motion.div>

              <motion.div className="mt-8 md:mt-16 border-l-4 border-gray-200 pl-6">
                <p className="text-gray-500 italic">
                  "Une immersion sonore totale. Connectez-vous au flux audio du stade en temps réel et profitez de commentaires exclusifs."
                </p>
              </motion.div>
            </div>

            <div className="md:w-1/2 flex justify-center items-center relative">
              <motion.div
                className="relative w-64 h-80 md:w-72 md:h-96"
                initial={{ y: 20, opacity: 0, rotate: 0 }}
                animate={flash ? { y: 6, opacity: 1, rotate: -4 } : { y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{ transformOrigin: 'center' }}
              >
                {/* ripples behind (canvas allowed to overflow phone bounds) */}
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                  <SoundRipples playing={playing} playingStartedAt={playingStartedAt} className="absolute -inset-96" flipped={true} />
                </div>

                {/* phone on top */}
                <div id="phone" className="relative z-10 w-full h-full flex items-center justify-center">
                  <PhoneWithHand flash={flash} playing={playing} playingStartedAt={playingStartedAt} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" preload="none" />

        <footer className="absolute bottom-6 left-6 text-xs text-gray-600 z-10">Odiho — Son en direct, expérience locale</footer>
      </main>
    </>
  )
}
