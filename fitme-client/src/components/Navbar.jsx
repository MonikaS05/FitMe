// client/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Menu, X, Shirt } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-purple-100 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo/Brand - Fancy font with beautiful gradient */}
        <Link 
          to="/" 
          className="group relative flex items-center gap-2"
        >
          {/* Dress Icon */}
          <div className="relative">
            <Shirt size={32} className="text-purple-600 dark:text-purple-400 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
          </div>

          <h1 
            className="text-4xl font-bold tracking-wide"
            style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
          >
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:via-pink-400 group-hover:to-amber-400 transition-all duration-300">
                Fit
              </span>
              <span className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 rounded-lg"></span>
            </span>
            <span 
              className="bg-gradient-to-r from-amber-500 via-rose-400 to-purple-600 bg-clip-text text-transparent group-hover:from-amber-400 group-hover:via-rose-300 group-hover:to-purple-500 transition-all duration-300"
              style={{ fontFamily: "'Dancing Script', 'Pacifico', cursive" }}
            >
              Me
            </span>
          </h1>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2 font-medium">
                Hey, {user?.name}! 👋
              </span>
              
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all duration-200"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
              
              <ThemeToggle />

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 font-medium transition-all duration-200"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 font-semibold transition-all duration-200"
              >
                Log In
              </Link>
              
              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-200"
              >
                Sign Up
              </Link>
              
              <ThemeToggle />
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-gray-700 dark:text-gray-300" />
          ) : (
            <Menu size={24} className="text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-purple-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-4 space-y-3">
            {isAuthenticated ? (
              <>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium pb-2 border-b border-purple-100 dark:border-gray-800">
                  Hey, {user?.name}! 👋
                </div>
                
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all"
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
                
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Theme</span>
                  <ThemeToggle />
                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 font-medium transition-all"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 font-semibold transition-all text-center"
                >
                  Log In
                </Link>
                
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/30 transition-all text-center"
                >
                  Sign Up
                </Link>
                
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Theme</span>
                  <ThemeToggle />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;