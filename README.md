# Odiho — Landing page (prototype)

Prototype Next.js landing page pour Odiho — service d'audio à distance dans les stades.

Prérequis

- Node.js 18+ et npm

Installer et lancer

```bash
cd /Users/leon/Documents/Dev/odiho-test
npm install
npm run dev
```

Ouvrez `http://localhost:3000` puis scannez le QR (placeholder) ou cliquez sur "Écouter le commentaire" pour tester la lecture audio (exemple externe).

Notes

- Ce prototype utilise Tailwind CSS et Framer Motion pour les animations.
- Le flux audio est un exemple public. En production, remplacez par le flux WebAudio / WebSocket du service Odiho.
