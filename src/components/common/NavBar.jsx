import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { FaLeaf, FaSearch, FaLightbulb, FaPenAlt, FaUser, FaSignOutAlt, FaMoon, FaSun, FaHome } from 'react-icons/fa';
import { BsMarkerTip } from "react-icons/bs";
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../Provider/AuthProvider';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  const navLinkClass = (isActive) =>
    isActive ? 'text-primary font-medium' : 'text-base-content';

  const menu = (
    <>
      <li>
        <NavLink to="/" end className={({ isActive }) => `hover:text-primary ${navLinkClass(isActive)}`}><FaHome className="text-sm" />Home</NavLink>
      </li>
      <li>
        <NavLink to="/explore" className={({ isActive }) => `flex items-center gap-1 hover:text-primary ${navLinkClass(isActive)}`}>
          <FaSearch className="text-sm" /> Explore Gardeners
        </NavLink>
      </li>
      <li>
        <NavLink to="/tips" className={({ isActive }) => `flex items-center gap-1 hover:text-primary ${navLinkClass(isActive)}`}>
          <FaLightbulb className="text-sm" /> Browse Tips
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/share-tip" className={({ isActive }) => `flex items-center gap-1 hover:text-primary ${navLinkClass(isActive)}`}>
              <FaPenAlt className="text-sm" /> Share a Tip
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-tips" className={({ isActive }) => `hover:text-primary ${navLinkClass(isActive)}`}><BsMarkerTip className="text-sm" />My Tips</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sm:px-8 fixed top-0 left-0 w-full z-50">
      {/* Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {menu}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          <FaLeaf className="text-primary" />
          <span className="ml-2 font-bold text-primary">GreenHaven</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{menu}</ul>
      </div>

      {/* Theme Toggle & Auth */}
      <div className="navbar-end gap-2">
        <motion.button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          initial={{ x: 0 }}
          animate={{ x: darkMode ? 4 : -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            {darkMode ? (
              <motion.span key="sun" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}>
                <FaSun className="text-xl" />
              </motion.span>
            ) : (
              <motion.span key="moon" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}>
                <FaMoon className="text-xl" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar"  title={user.displayName || 'User'}>
              <div className="w-10 rounded-full">
                <img alt="User profile" src={user.photoURL || 'https://i.postimg.cc/VsJzs7By/Tonmoy-Sarker.jpg'} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><NavLink to="/Profile">Profile</NavLink></li>
              <li><button onClick={handleLogout}><FaSignOutAlt /> Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/auth" className="btn btn-outline btn-primary btn-sm md:btn-md">
            <FaUser /> Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
