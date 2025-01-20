import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#102A43]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white">
          CLUBCENTER
        </Link>
        
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/activities" className="text-gray-300 hover:text-white">
            Activités
          </Link>
          <Link to="/clubs" className="text-gray-300 hover:text-white">
            Clubs
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/club/register">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-[#1A365D]">
              Inscription club
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-[#1A365D]">
              Connexion
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-[#1A365D]">
              Inscription
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}