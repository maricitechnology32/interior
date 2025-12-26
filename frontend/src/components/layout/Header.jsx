import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/decor-logo.png';
import { useAuth } from '../../hooks/useAuth';

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
          ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm'
          : 'bg-[#182527]'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14 lg:h-16">

            {/* Logo */}
            <Link to="/" onClick={handleNavClick} className="flex items-center gap-3 group">
              <img
                src={logo}
                className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-105"
                alt="The Space Stylers"
              />
              <div className="hidden sm:block">
                <div className={`font-serif font-bold text-[10px] leading-tight tracking-[0.2em] transition-colors duration-300 ${isScrolled ? 'text-[#182527]' : 'text-white'
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
                  className={`relative py-1 font-medium text-sm tracking-wide transition-colors duration-300 group ${isScrolled
                    ? isActive(link.path)
                      ? 'text-[#182527]'
                      : 'text-gray-500 hover:text-[#182527]'
                    : isActive(link.path)
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-[1px] bg-[#D1B68A] transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
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
                      className={`flex items-center gap-3 px-2 py-1.5 rounded-full transition-colors ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}
                    >
                      <img
                        src={userInfo?.profileImage?.url || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border border-[#D1B68A]"
                      />
                      <span className={`font-medium text-sm hidden xl:block ${isScrolled ? 'text-[#182527]' : 'text-white'
                        }`}>
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
                        className={`transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''} ${isScrolled ? 'text-[#182527]' : 'text-white'}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div className={`absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-2 border border-gray-100 overflow-hidden origin-top-right transition-all duration-200 ${isUserDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>

                      <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/50">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
                        <p className="text-sm font-medium text-[#182527] truncate">{userInfo?.email}</p>
                      </div>

                      <div className="py-2">
                        {isAdmin && (
                          <Link
                            to="/admin/dashboard"
                            className="block px-5 py-2.5 text-sm text-gray-600 hover:text-[#182527] hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          to="/profile"
                          className="block px-5 py-2.5 text-sm text-gray-600 hover:text-[#182527] hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          Account Settings
                        </Link>
                      </div>

                      <div className="border-t border-gray-50 pt-2 pb-1">
                        <button
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            logoutHandler();
                          }}
                          className="block w-full text-left px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
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
                  className="group relative px-6 py-2 overflow-hidden rounded-full bg-[#D1B68A] text-[#182527] font-medium text-sm transition-all duration-300 hover:bg-[#c4a87d] hover:shadow-lg hover:shadow-[#D1B68A]/20"
                >
                  <span className="relative z-10">Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <span className={`block w-6 h-0.5 transition-all ${isScrolled ? 'bg-[#182527]' : 'bg-white'
                  } ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 transition-all ${isScrolled ? 'bg-[#182527]' : 'bg-white'
                  } ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 transition-all ${isScrolled ? 'bg-[#182527]' : 'bg-white'
                  } ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-screen' : 'max-h-0'
            } ${isScrolled ? 'bg-white border-b border-gray-100' : 'bg-[#182527]'}`}
        >
          <div className="px-6 py-8 space-y-6">
            {/* User Info Mobile */}
            {isLoggedIn && (
              <div
                onClick={() => {
                  navigate('/profile');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors ${isScrolled ? 'bg-gray-50 border border-gray-100' : 'bg-white/5 border border-white/10'
                  }`}>
                <img
                  src={userInfo?.profileImage?.url || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#D1B68A]"
                />
                <div>
                  <p className={`font-serif font-semibold text-lg ${isScrolled ? 'text-[#182527]' : 'text-white'}`}>
                    {userInfo?.name || 'User'}
                  </p>
                  <p className={`text-sm ${isScrolled ? 'text-gray-500' : 'text-gray-400'}`}>
                    {userInfo?.email}
                  </p>
                </div>
              </div>
            )}

            {/* Nav Links Mobile */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className={`block p-4 text-center font-medium rounded-lg transition-all ${isScrolled
                    ? isActive(link.path)
                      ? 'text-[#182527] bg-gray-50 font-semibold'
                      : 'text-gray-500 hover:bg-gray-50'
                    : isActive(link.path)
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white'
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
                className={`block w-full text-center p-4 rounded-lg border border-dashed border-[#D1B68A] text-[#D1B68A] font-medium hover:bg-[#D1B68A]/10 transition-colors`}
              >
                Admin Dashboard
              </Link>
            )}

            {/* Auth Button Mobile */}
            <div className="pt-2">
              {isLoggedIn ? (
                <button
                  onClick={logoutHandler}
                  className={`w-full p-4 font-medium rounded-lg border ${isScrolled
                    ? 'border-red-100 text-red-600 bg-red-50'
                    : 'border-white/10 text-red-300 bg-white/5'
                    }`}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={handleNavClick}
                  className="block w-full p-4 text-center bg-[#D1B68A] rounded-lg font-bold text-[#182527] shadow-lg shadow-[#D1B68A]/20"
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
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </header>

      {/* Spacer */}
      <div className="h-14 lg:h-16" />
    </>
  );
};

export default Header;