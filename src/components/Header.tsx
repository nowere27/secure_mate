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
            className="object-contain w-10 h-10 transition-all duration-300"
            aria-hidden="true"
          />
          <span className={`ml-2 text-xl font-poppins font-bold ${isScrolled ? 'text-white' : 'text-primary'}`}>
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
          className="p-2 transition-colors duration-200 rounded-lg md:hidden text-primary hover:bg-gray-100"
          aria-label={`${isMenuOpen ? 'Close' : 'Open'} navigation menu`}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <X className={`w-7 h-7 ${isScrolled ? 'text-white' : 'text-primary'}`} aria-hidden="true" />
          ) : (
            <Menu className={`w-7 h-7 ${isScrolled ? 'text-white' : 'text-primary'}`} aria-hidden="true" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={`fixed top-0 left-0 w-full h-full z-40 bg-white md:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
            <a href="#home" className="flex items-center" onClick={handleNavLinkClick}>
              <img src={logoImage} alt="SecureMate Logo" className="object-contain w-8 h-8" />
              <span className="ml-2 text-xl font-bold font-poppins text-primary">SecureMate</span>
            </a>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-primary hover:bg-gray-100"
              aria-label="Close navigation menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 gap-6 px-6" role="navigation" aria-label="Mobile navigation">
            {renderNavLinks(navLinks)}
            <a
              href="#book-now"
              className="w-full mt-4 text-center btn btn-primary hover:opacity-90"
              onClick={handleNavLinkClick}
            >
              Book Now
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;