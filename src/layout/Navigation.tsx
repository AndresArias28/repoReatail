import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { NAVIGATION_ITEMS, APP_CONFIG, BLESS_COLORS } from '../utils/constants';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center" 
              style={{background: `linear-gradient(to right, ${BLESS_COLORS.yellow}, ${BLESS_COLORS.orange}, ${BLESS_COLORS.fucsia})`}}
            >
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <span 
              className="text-2xl font-bold" 
              style={{
                background: `linear-gradient(to right, ${BLESS_COLORS.blue}, ${BLESS_COLORS.purple})`, 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                backgroundClip: 'text'
              }}
            >
              {APP_CONFIG.name}
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <a 
                key={item.id}
                href={item.path} 
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                {item.label}
              </a>
            ))}
            <Button 
              className="text-white" 
              style={{background: `linear-gradient(to right, ${BLESS_COLORS.blue}, ${BLESS_COLORS.purple})`}}
            >
              Solicitar Ahora
            </Button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAVIGATION_ITEMS.map((item) => (
                <a 
                  key={item.id}
                  href={item.path} 
                  className="block px-3 py-2 text-gray-700"
                >
                  {item.label}
                </a>
              ))}
              <div className="px-3 py-2">
                <Button 
                  className="w-full text-white" 
                  style={{background: `linear-gradient(to right, ${BLESS_COLORS.blue}, ${BLESS_COLORS.purple})`}}
                >
                  Solicitar Ahora
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
