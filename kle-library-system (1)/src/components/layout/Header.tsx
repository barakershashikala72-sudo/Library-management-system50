import { Library as LibraryIcon, MapPin, Menu, Search, ShoppingCart, Globe, ChevronDown, Home } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { getReservations } from '../../lib/db';
import { useLanguage } from '../../contexts/LanguageContext';
import { Language } from '../../i18n/translations';

export default function Header() {
  const { pathname } = useLocation();
  const isPortal = pathname.startsWith('/portal');
  const { language, setLanguage, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [reservationCount, setReservationCount] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageLabels: Record<Language, string> = {
    en: 'English',
    kn: 'ಕನ್ನಡ',
    hi: 'हिन्दी'
  };

  useEffect(() => {
    const updateCount = () => {
      const res = getReservations();
      setReservationCount(res.length);
    };

    updateCount();

    // Listen for storage changes (multi-tab support)
    window.addEventListener('storage', updateCount);
    
    // Custom event for same-tab updates if needed, 
    // but usually navigation handles re-renders.
    // Let's add an interval for better responsiveness in this demo
    const interval = setInterval(updateCount, 1000);

    return () => {
      window.removeEventListener('storage', updateCount);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInputRef.current?.value;
    if (query) {
      navigate(`/?q=${encodeURIComponent(query)}`);
    } else {
      navigate('/');
    }
  };

  const handleSearchClick = () => {
    if (searchInputRef.current?.value) {
      navigate(`/?q=${encodeURIComponent(searchInputRef.current.value)}`);
    } else {
      searchInputRef.current?.focus();
    }
  };

  const [portalSearchOpen, setPortalSearchOpen] = React.useState(false);

  if (isPortal) {
    return (
      <header className="bg-f1-black text-white border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center justify-center w-10 h-10 hover:bg-white/10 rounded-full transition-colors shrink-0" title="Home">
              <Home size={24} className="text-white" />
            </Link>
            <Link to="/" className="flex items-center gap-2 group shrink-0 mr-12">
              <div className="w-10 h-10 bg-f1-red flex items-center justify-center transform skew-x-[-15deg] group-hover:scale-110 transition-transform">
                <LibraryIcon className="text-white transform skew-x-[15deg] w-6 h-6" />
              </div>
              <span className="font-display font-black text-2xl tracking-tighter uppercase italic flex items-center">
                KLE <span className="text-f1-red ml-2">Portal</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/portal/user" className={cn("font-display uppercase text-sm tracking-widest hover:text-f1-red transition-colors font-bold", pathname === '/portal/user' && "text-f1-red border-b-2 border-f1-red")}>{t.nav.student}</Link>
            <Link to="/portal/employee" className={cn("font-display uppercase text-sm tracking-widest hover:text-f1-red transition-colors font-bold", pathname === '/portal/employee' && "text-f1-red border-b-2 border-f1-red")}>{t.nav.employee}</Link>
            <Link to="/portal/admin" className={cn("font-display uppercase text-sm tracking-widest hover:text-f1-red transition-colors font-bold", pathname === '/portal/admin' && "text-f1-red border-b-2 border-f1-red")}>{t.nav.admin}</Link>
          </nav>

          <div className="flex items-center gap-4">
             <div className="relative" ref={langMenuRef}>
                <button 
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1 hover:text-f1-red transition-colors text-xs font-mono font-bold uppercase tracking-widest p-2"
                >
                  <Globe size={18} />
                  <span>{language.toUpperCase()}</span>
                  <ChevronDown size={14} className={cn("transition-transform", langMenuOpen && "rotate-180")} />
                </button>
                
                {langMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-f1-black border border-white/10 rounded-sm shadow-2xl py-1 min-w-[120px] z-[60]">
                    {(Object.keys(languageLabels) as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setLangMenuOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-f1-black transition-colors",
                          language === lang ? "text-f1-red" : "text-white"
                        )}
                      >
                        {languageLabels[lang]}
                      </button>
                    ))}
                  </div>
                )}
             </div>

             <div className="relative hidden sm:block">
                <Search 
                  className={cn("absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors", portalSearchOpen && "text-f1-red")} 
                  size={18} 
                />
                <input 
                  ref={searchInputRef}
                  type="text"
                  onFocus={() => setPortalSearchOpen(true)}
                  onBlur={() => setPortalSearchOpen(false)}
                  placeholder={t.nav.quickSearch}
                  className="bg-white border border-gray-300 py-2 pl-10 pr-4 rounded-sm text-xs font-mono focus:outline-none focus:border-f1-red transition-all w-48 lg:w-64 text-black"
                />
             </div>
             <button 
                onClick={() => {
                  if (window.innerWidth < 640) {
                     // On mobile, maybe redirect to a search page or focus something
                  }
                  searchInputRef.current?.focus();
                }}
                className="sm:hidden p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white"
             >
                <Search size={20} />
             </button>
             <div className="h-8 w-[2px] bg-white/20 hidden md:block"></div>
             <button className="bg-f1-red text-white px-6 py-2 rounded-sm font-display font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-f1-red transition-all transform skew-x-[-15deg]">
                <span className="block transform skew-x-[15deg]">{t.nav.logout}</span>
             </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-[#0f1111] text-white sticky top-0 z-50">
      {/* Top Header */}
      <div className="flex items-center gap-4 px-4 py-2 h-14">
        <Link to="/" className="flex items-center justify-center border border-transparent hover:border-white p-1 rounded-sm h-10 w-10 shrink-0" title="Home">
          <Home size={24} className="text-white" />
        </Link>
        <Link to="/" className="flex items-center gap-1 border border-transparent hover:border-white p-1 rounded-sm shrink-0 mr-4">
          <LibraryIcon className="text-blue-400 w-8 h-8" />
          <span className="font-bold text-xl leading-none tracking-tighter">KLE<br/><span className="text-sm font-medium text-blue-400">Library</span></span>
        </Link>

        <div className="hidden lg:flex flex-col border border-transparent hover:border-white p-1 px-2 rounded-sm cursor-pointer text-gray-300">
          <span className="text-xs">{t.nav.locationLabel}</span>
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-white" />
            <span className="text-sm font-bold text-white">{t.nav.locationName}</span>
          </div>
        </div>

        <div className="relative" ref={langMenuRef}>
          <button 
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-1 border border-transparent hover:border-white p-1 px-2 rounded-sm h-10 group"
          >
            <Globe size={18} className="text-gray-400 group-hover:text-white" />
            <span className="font-bold text-sm">{language.toUpperCase()}</span>
            <ChevronDown size={14} className={cn("transition-transform", langMenuOpen && "rotate-180")} />
          </button>
          
          {langMenuOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-sm shadow-xl py-2 min-w-[150px] z-[60]">
              {(Object.keys(languageLabels) as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setLangMenuOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm transition-colors block",
                    language === lang ? "text-blue-600 font-bold bg-blue-50" : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <span className="flex items-center justify-between">
                    {languageLabels[lang]}
                    {language === lang && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSearch} className="flex-1 flex h-10 ml-2">
          <div className="bg-gray-100 text-gray-700 px-3 rounded-l-md flex items-center text-xs border-r border-gray-300 cursor-pointer hover:bg-gray-200">
            {t.nav.catalog}
          </div>
          <input 
            ref={searchInputRef}
            type="text" 
            className="flex-1 px-3 text-black focus:outline-none" 
            placeholder={t.nav.searchPlaceholder}
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-3 rounded-r-md hover:bg-blue-700 transition-colors"
          >
            <Search size={24} />
          </button>
        </form>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex flex-col border border-transparent hover:border-white p-1 px-2 rounded-sm cursor-pointer">
            <span className="text-xs">{t.nav.digitalResources.split(' ')[0]}</span>
            <span className="text-sm font-bold">{t.nav.digitalResources.split(' ')[1] || 'Resources'}</span>
          </div>
          <div className="flex flex-col border border-transparent hover:border-white p-1 px-2 rounded-sm cursor-pointer">
            <span className="text-xs text-gray-400">{t.nav.myBorrowed.split(' ')[0]}</span>
            <span className="text-sm font-bold">{t.nav.myBorrowed.split(' ')[1] || 'Borrowed'}</span>
          </div>
          <Link to="/reservations" className="relative flex flex-col border border-transparent hover:border-white p-1 px-2 rounded-sm cursor-pointer group">
            <span className="text-xs text-gray-400">{t.nav.checkReserved.split(' ')[0]}</span>
            <span className="text-sm font-bold">{t.nav.checkReserved.split(' ')[1] || 'Reserved'}</span>
            {reservationCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0f1111] shadow-lg">
                {reservationCount}
              </span>
            )}
          </Link>
          <Link to="/portal/user" className="flex items-center gap-2 border border-transparent hover:border-white p-1 px-2 rounded-sm text-white">
            <div className="relative">
              <LibraryIcon size={24} className="text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">{t.nav.portals}</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Nav Row */}
      <div className="bg-[#232f3e] flex items-center px-4 py-1 gap-4 text-sm font-medium">
        <button className="flex items-center gap-1 hover:border-white border border-transparent p-1 rounded-sm">
          <Menu size={20} />
          {t.nav.menu}
        </button>
        <Link to="/portal/user" className="hover:border-white border border-transparent p-1 rounded-sm">{t.nav.studentPortal}</Link>
        <Link to="/portal/employee" className="hover:border-white border border-transparent p-1 rounded-sm">{t.nav.facultyAccess}</Link>
        <Link to="/portal/admin" className="hover:border-white border border-transparent p-1 rounded-sm">{t.nav.librarianPortal}</Link>
        <span className="hover:border-white border border-transparent p-1 rounded-sm cursor-pointer ml-auto font-bold text-blue-400">{t.nav.eJournals}</span>
      </div>
    </header>
  );
}
