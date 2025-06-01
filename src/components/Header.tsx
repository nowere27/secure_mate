import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data';
import { NavLink } from '../types/navigation';
import logoImage from '../assets/images/Subtract.png';
import logoScrolledImage from '../assets/images/Subtract (1).png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
        isScrolled ? 'bg-primary shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="flex items-center justify-between container-custom">
        {/* Logo */}
        <a 
          href="#home" 
          className="flex items-center transition-colors duration-200"
          aria-label="SecureMate Home"
        >
          <img 
            src={isScrolled ? logoScrolledImage : logoImage}
            alt=""
            className="object-contain w-8 h-8 transition-all duration-300 md:w-10 md:h-10"
            aria-hidden="true"
          />
          <span className={`ml-2 text-lg md:text-xl font-poppins font-bold ${isScrolled ? 'text-white' : 'text-primary'}`}>
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
          <a 
            href="#book-now" 
            className="transition-opacity duration-200 btn btn-primary hover:opacity-90"
            role="button"
          >
            Book Now
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-1.5 md:p-2 transition-colors duration-200 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
            isScrolled ? 'bg-white/10' : 'bg-primary/10'
          }`}
          aria-label={`${isMenuOpen ? 'Close' : 'Open'} navigation menu`}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
          {isMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-primary'}`} aria-hidden="true" />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-primary'}`} aria-hidden="true" />
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
                <a
                  href="#book-now"
                  className="block w-full py-3 text-center text-white transition-opacity bg-primary rounded-xl hover:opacity-90"
                  onClick={handleNavLinkClick}
                >
                  Book Now
                </a>
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
    </header>
  );
};

export default Header;