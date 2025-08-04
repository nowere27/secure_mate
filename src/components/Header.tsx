import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import UserMenu from './UserMenu';
import { navLinks } from '../data';
import { NavLink } from '../types/navigation';
import logoImage from '../assets/images/Subtract.png';
import logoScrolledImage from '../assets/images/Subtract (1).png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, loading } = useAuth();

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 10;
    if (isScrolled !== scrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);
  
  useEffect(() => {
    let ticking = false;
    
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => window.removeEventListener('scroll', scrollListener);
  }, [handleScroll]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleBookNowClick = () => {
    if (!user) {
      setShowAuthModal(true);
    }
    // If user is logged in, they're already on the dashboard
  };

  const renderNavLinks = (links: NavLink[]) => (
    links.map((link) => (
      <a
        key={link.name}
        href={link.href}
        className={`font-medium hover:text-accent transition-colors duration-200 ${
          isScrolled ? 'text-white' : 'text-primary'
        }`}
        onClick={handleNavLinkClick}
      >
        {link.name}
      </a>
    ))
  );

  return (
    <header 
      role="banner"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary shadow-md py-2' : 'bg-transparent py-3 sm:py-4'
      }`}
    >
      <div className="flex items-center justify-between container-custom px-4 md:px-6">
        {/* Logo */}
        <a 
          href="#home" 
          className="flex items-center transition-colors duration-200"
          aria-label="SecureMate Home"
        >
          <img 
            src={isScrolled ? logoScrolledImage : logoImage}
            alt=""
            className="object-contain w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300"
            aria-hidden="true"
          />
          <span className={`ml-2 text-lg sm:text-xl font-poppins font-bold ${isScrolled ? 'text-white' : 'text-primary'}`}>
            SecureMate
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <nav 
          className="items-center hidden space-x-8 md:flex"
          role="navigation"
          aria-label="Main navigation"
        >
          {renderNavLinks(navLinks)}
          {loading ? (
            <div className="w-20 h-10 bg-primary/20 rounded-xl animate-pulse"></div>
          ) : user ? (
            <UserMenu />
          ) : (
            <button 
              onClick={handleBookNowClick}
              data-auth-trigger
              className="transition-opacity duration-200 btn btn-primary hover:opacity-90"
            >
              Book Now
            </button>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-1.5 sm:p-2 transition-colors duration-200 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
            isMenuOpen ? 'bg-gray-100' : ''
          }`}
          aria-label={`${isMenuOpen ? 'Close' : 'Open'} navigation menu`}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
          {isMenuOpen ? (
            <X className={`w-6 h-6 sm:w-8 sm:h-8 ${isScrolled ? 'text-primary' : 'text-primary'}`} aria-hidden="true" />
          ) : (
            <Menu className={`w-6 h-6 sm:w-8 sm:h-8 ${isScrolled ? 'text-primary' : 'text-primary'}`} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-4 top-20 z-50 transform transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="relative overflow-hidden bg-white shadow-lg rounded-2xl">
          <div className="relative z-10">
            <nav 
              className="flex flex-col py-4" 
              role="navigation" 
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-6 py-3 text-base font-medium transition-colors text-neutral-800 hover:bg-neutral-50 hover:text-accent"
                  onClick={handleNavLinkClick}
                >
                  {link.name}
                </a>
              ))}
              <div className="px-4 pt-4 mt-2 border-t border-neutral-100">
                <button
                  onClick={handleBookNowClick}
                  className="block w-full py-3 text-center text-white transition-opacity bg-primary rounded-xl hover:opacity-90"
                >
                  {user ? 'Dashboard' : 'Book Now'}
                </button>
              </div>
            </nav>
          </div>
          {/* Decorative background */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute left-0 w-24 h-24 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 bg-primary"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 transform translate-x-1/2 translate-y-1/2 rounded-full bg-accent"></div>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </header>
  );
};

export default Header;