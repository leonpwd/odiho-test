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

  const togglePlay = async () => {
    if (!audioRef.current) return
    try {
      if (playing) {
        audioRef.current.pause()
        setPlaying(false)
      } else {
        await audioRef.current.play()
        setPlaying(true)
      }
    } catch (e) {
      console.warn('Play blocked', e)
    }
  }

  // Auto sequence on page load: hand comes, QR appears, then start sound animation
  useEffect(() => {
    const startDelay = 500 // ms before hand comes
    const qrAppearDelay = 600 // internal delay in PhoneWithHand before QR appears
    const playAfter = 300 // extra delay after QR appears to start sound

    const t1 = setTimeout(() => setFlash(true), startDelay)
    const t2 = setTimeout(() => setPlaying(true), startDelay + qrAppearDelay + playAfter)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Odiho — Son en direct au stade</title>
        <meta name="description" content="Odiho: écoutez le commentaire audio en scannant un QR depuis votre place au stade." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="min-h-screen relative overflow-hidden bg-white">
        {/* Background decorative blobs */}
        <div className="blob w-96 h-96 bg-pink-200 rounded-full -top-20 -left-20 animate-float" style={{position:'absolute'}} />
        <div className="blob w-72 h-72 bg-indigo-200 rounded-full -bottom-24 -right-16 animate-slowSpin" style={{position:'absolute'}} />

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-5xl md:text-6xl font-extrabold leading-tight text-black">Odiho</motion.h1>
              <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 }} className="mt-6 text-lg md:text-xl text-gray-700 max-w-xl">Dans un stade, tu flashes un QR code et ta page web te transmet en direct le son des commentateurs — à l'oreille, sans interférer avec les enceintes du stade.</motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24 }} className="mt-8 flex items-center gap-4">
                <button onClick={togglePlay} className="btn-glow bg-emerald-400 hover:bg-emerald-500 text-black font-bold py-3 px-6 rounded-lg shadow-lg">
                  {playing ? 'Stop' : 'Écouter le commentaire'}
                </button>

                <a href="#qr" className="text-sm text-gray-700 bg-white/5 py-2 px-4 rounded-md">Scannez le QR pour rejoindre</a>
              </motion.div>

              <motion.div className="mt-8">
                <div className="stadium-wave" />
                <p className="mt-3 text-sm text-gray-300 max-w-md">Cas d'usage: évitez les interférences et apportez une expérience audio personnalisée à chaque place. Parfait pour commentaires multilingues, audio-description et flux premium.</p>
              </motion.div>
            </div>

            <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center items-center flex-col gap-6">
              <div className="relative w-72 h-96">
                {/* ripples behind */}
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                  <div className="w-full h-full max-w-md">
                    <SoundRipples playing={playing} className="w-full h-full" />
                  </div>
                </div>

                {/* phone on top */}
                <motion.div id="phone" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="relative z-10 w-full h-full flex items-center justify-center">
                  <PhoneWithHand flash={flash} playing={playing} />
                </motion.div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.36 }}>
                <SoundRipples playing={playing} />
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
