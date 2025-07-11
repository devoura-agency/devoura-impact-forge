import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  // { name: 'Why NGOs', path: '/why-ngos' },
  { name: 'Services', section: 'services' },
  { name: 'Portfolio', path: '/portfolio' },
  // { name: 'Team', section: 'team' },
  { name: 'Contact', section: 'contact' },
  { name: 'Plans', path: '/pricing' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleGetStarted = () => {
    navigate('/wizard');
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-brand-cream">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={handleLogoClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src="/lovable-uploads/1c757405-61a4-40fb-b732-c1c154f7a2c4.png" 
              alt="Devoura Logo" 
              className="w-10 h-10 drop-shadow-lg"
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}
            />
            <span className="text-2xl font-bold text-brand-green">Devoura</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, idx) =>
              link.path ? (
                <motion.div key={link.name} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    to={link.path}
                    className={`text-gray-700 hover:text-brand-green transition-colors font-medium ${location.pathname === link.path ? 'text-brand-green font-bold' : ''}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ) : (
                <motion.div key={link.name} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                  <button
                    onClick={() => scrollToSection(link.section!)}
                    className="text-gray-700 hover:text-brand-green transition-colors font-medium"
                  >
                    {link.name}
                  </button>
                </motion.div>
              )
            )}
            <Button 
              onClick={handleGetStarted}
              className="bg-brand-green hover:bg-brand-green-light text-white"
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-brand-cream animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, idx) =>
                link.path ? (
                  <motion.div key={link.name} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      to={link.path}
                      className={`text-left text-gray-700 hover:text-brand-green transition-colors font-medium ${location.pathname === link.path ? 'text-brand-green font-bold' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div key={link.name} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                    <button
                      onClick={() => scrollToSection(link.section!)}
                      className="text-left text-gray-700 hover:text-brand-green transition-colors font-medium"
                    >
                      {link.name}
                    </button>
                  </motion.div>
                )
              )}
              <Button 
                onClick={handleGetStarted}
                className="bg-brand-green hover:bg-brand-green-light text-white w-fit"
              >
                Get Started
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
