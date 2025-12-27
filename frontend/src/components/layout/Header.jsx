import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/decor-logo.png';
import { useAuth } from '../../hooks/useAuth';
import { User, LogOut, Settings, LayoutDashboard } from 'lucide-react';

const Header = () => {
  const { isLoggedIn, userInfo, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const userDropdownRef = useRef(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    if (isUserDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  // Close menu on route change & scroll to top
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/services', label: 'Services' },
    { path: '/blog', label: 'Blog' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleNavClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-surface/95 backdrop-blur-md border-b border-gray-100 shadow-soft'
          : 'bg-primary'
          }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" onClick={handleNavClick} className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center bg-surface rounded-full shadow-sm group-hover:scale-105 transition-transform duration-300">
                <img
                  src={logo}
                  className="w-6 h-6 object-contain"
                  alt="The Space Stylers"
                />
              </div>
              <div className="hidden sm:block">
                <div className={`font-serif font-bold text-[10px] leading-tight tracking-[0.25em] transition-colors duration-300 ${isScrolled ? 'text-primary' : 'text-white'
                  }`}>
                  <div>THE</div>
                  <div>SPACE</div>
                  <div>STYLERS</div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-300 group ${isScrolled
                    ? isActive(link.path)
                      ? 'text-primary font-semibold'
                      : 'text-text-secondary hover:text-primary'
                    : isActive(link.path)
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-secondary rounded-full transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  {/* User Dropdown */}
                  <div className="relative" ref={userDropdownRef}>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className={`flex items-center gap-3 pl-1 pr-3 py-1 rounded-full border transition-all duration-300 ${isScrolled
                        ? 'border-gray-200 bg-surface hover:shadow-md'
                        : 'border-white/20 bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      <img
                        src={userInfo?.profileImage?.url || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border border-secondary"
                      />
                      <span className="font-medium text-sm max-w-[100px] truncate">
                        {userInfo?.name?.split(' ')[0] || 'User'}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div className={`absolute right-0 mt-4 w-64 bg-surface rounded-xl shadow-card p-2 border border-gray-100 origin-top-right transition-all duration-200 ${isUserDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>

                      <div className="px-4 py-3 border-b border-gray-50 mb-2">
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Signed in as</p>
                        <p className="text-sm font-medium text-primary truncate">{userInfo?.email}</p>
                      </div>

                      <div className="space-y-1">
                        {isAdmin && (
                          <Link
                            to="/admin/dashboard"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-primary hover:bg-surface-secondary rounded-lg transition-colors"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-primary hover:bg-surface-secondary rounded-lg transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Account Settings
                        </Link>
                      </div>

                      <div className="border-t border-gray-50 mt-2 pt-2">
                        <button
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            logoutHandler();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-status-error hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={handleNavClick}
                  className="btn btn-primary"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5 w-6">
                <span className={`block w-full h-0.5 transition-all duration-300 ${isScrolled ? 'bg-primary' : 'bg-white'
                  } ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-full h-0.5 transition-all duration-300 ${isScrolled ? 'bg-primary' : 'bg-white'
                  } ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-full h-0.5 transition-all duration-300 ${isScrolled ? 'bg-primary' : 'bg-white'
                  } ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            } ${isScrolled ? 'bg-surface border-b border-gray-100' : 'bg-primary'}`}
        >
          <div className="container-custom py-8 space-y-8">
            {/* User Info Mobile */}
            {isLoggedIn && (
              <div
                onClick={() => {
                  navigate('/profile');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors ${isScrolled ? 'bg-surface-secondary border border-gray-100' : 'bg-white/5 border border-white/10'
                  }`}>
                <img
                  src={userInfo?.profileImage?.url || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-secondary"
                />
                <div>
                  <p className={`font-serif font-bold text-lg ${isScrolled ? 'text-primary' : 'text-white'}`}>
                    {userInfo?.name || 'User'}
                  </p>
                  <p className={`text-sm ${isScrolled ? 'text-text-secondary' : 'text-gray-400'}`}>
                    {userInfo?.email}
                  </p>
                </div>
              </div>
            )}

            {/* Nav Links Mobile */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className={`block px-6 py-4 text-center font-medium rounded-xl transition-all ${isScrolled
                    ? isActive(link.path)
                      ? 'text-primary bg-secondary/10 font-bold border border-secondary/20'
                      : 'text-text-secondary hover:bg-surface-secondary'
                    : isActive(link.path)
                      ? 'text-white bg-white/10 border border-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Admin Link Mobile */}
            {isLoggedIn && isAdmin && (
              <Link
                to="/admin/dashboard"
                className={`block w-full text-center p-4 rounded-xl border border-dashed border-secondary text-secondary font-medium hover:bg-secondary/10 transition-colors`}
              >
                Admin Dashboard
              </Link>
            )}

            {/* Auth Button Mobile */}
            <div className="pt-4">
              {isLoggedIn ? (
                <button
                  onClick={logoutHandler}
                  className={`w-full p-4 font-medium rounded-xl border transition-colors ${isScrolled
                    ? 'border-red-100 text-status-error bg-red-50'
                    : 'border-white/10 text-red-300 bg-white/5'
                    }`}
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={handleNavClick}
                  className="btn btn-primary w-full"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transform transition-opacity"
            onClick={() => setIsMenuOpen(false)}
            style={{ top: '80px' }}
          />
        )}
      </header>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default Header;