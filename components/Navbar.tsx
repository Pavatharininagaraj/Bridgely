
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, Menu, X, Video, BookOpen, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav 
      className={`w-full py-3 px-4 md:px-6 flex items-center justify-between fixed top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="flex items-center space-x-2 z-50">
        <motion.div 
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Hand className="w-5 h-5 text-white" />
        </motion.div>
        <span className={`text-xl font-semibold ${scrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-black'}`}>
          Bridgely
        </span>
      </Link>
      
      {/* Desktop navigation */}
      <div className="hidden md:flex space-x-1 bg-white/20 backdrop-blur-md p-1 rounded-full">
        <Link to="/">
          <motion.button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
              location.pathname === '/' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-white/50'
            }`}
            whileHover={{ scale: location.pathname !== '/' ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </motion.button>
        </Link>
        <Link to="/learn">
          <motion.button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
              location.pathname === '/learn' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-white/50'
            }`}
            whileHover={{ scale: location.pathname !== '/learn' ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Interactive Learning
          </motion.button>
        </Link>
        <Link to="/video-learning">
          <motion.button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
              location.pathname === '/video-learning' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-white/50'
            }`}
            whileHover={{ scale: location.pathname !== '/video-learning' ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Video className="w-4 h-4 mr-2" />
            Video Tutorials
          </motion.button>
        </Link>
      </div>

      {/* Mobile menu button */}
      <button 
        className="md:hidden p-2 rounded-full hover:bg-white/20 z-50"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className={`h-5 w-5 ${scrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-white'}`} />
        ) : (
          <Menu className={`h-5 w-5 ${scrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-white'}`} />
        )}
      </button>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 flex flex-col pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-6 space-y-6">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <motion.div 
                  className={`flex items-center space-x-3 p-4 rounded-xl ${
                    location.pathname === '/' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <Home className="w-5 h-5" />
                  <span className="text-lg font-medium">Home</span>
                </motion.div>
              </Link>
              
              <Link to="/learn" onClick={() => setIsMobileMenuOpen(false)}>
                <motion.div 
                  className={`flex items-center space-x-3 p-4 rounded-xl ${
                    location.pathname === '/learn' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-lg font-medium">Interactive Learning</span>
                </motion.div>
              </Link>
              
              <Link to="/video-learning" onClick={() => setIsMobileMenuOpen(false)}>
                <motion.div 
                  className={`flex items-center space-x-3 p-4 rounded-xl ${
                    location.pathname === '/video-learning' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <Video className="w-5 h-5" />
                  <span className="text-lg font-medium">Video Tutorials</span>
                </motion.div>
              </Link>
            </div>
            
            <div className="mt-auto p-6 border-t border-gray-100">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Hand className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-600">© {new Date().getFullYear()} Bridgely</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
