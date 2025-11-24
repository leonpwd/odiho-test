import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-40 backdrop-blur bg-white/40 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-indigo-500 to-emerald-400 rounded-lg flex items-center justify-center font-extrabold text-black">O</div>
          <div>
            <div className="text-black font-bold">Odiho</div>
            <div className="text-xs text-gray-600 -mt-0.5">Son localisé en stade</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <Link href="#features" className="hover:text-black">Fonctionnalités</Link>
          <Link href="#how" className="hover:text-black">Comment ça marche</Link>
          <Link href="#team" className="hover:text-black">Équipe</Link>
          <Link href="#contact" className="bg-black text-white px-3 py-2 rounded-md">Contact</Link>
        </nav>

        <div className="md:hidden text-sm text-gray-700">Menu</div>
      </div>
    </header>
  )
}
