import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutTemplate, Heart, LogOut, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass sticky top-0 z-50 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/templates" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform duration-300">
                <LayoutTemplate className="h-6 w-6 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 group-hover:text-primary-600 transition-colors">
                MiniSaaS
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-4">
            {user ? (
              <>
                <Link 
                  to="/templates" 
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive('/templates') 
                      ? 'bg-slate-100 text-primary-600' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600'
                  }`}
                >
                  Explore
                </Link>
                <Link 
                  to="/favorites" 
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                    isActive('/favorites') 
                      ? 'bg-pink-50 text-pink-600' 
                      : 'text-slate-600 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isActive('/favorites') ? 'fill-pink-600' : ''}`} /> 
                  Favorites
                </Link>
                
                <div className="flex items-center gap-4 ml-2 pl-4 sm:ml-4 sm:pl-6 border-l border-slate-200">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-xs text-slate-500 font-medium">Welcome back,</span>
                    <span className="text-sm font-bold text-slate-800">{user.username}</span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-100 to-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-primary-700 font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center gap-1.5 text-slate-600 hover:text-primary-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  <LogIn className="h-4 w-4" /> Login
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center gap-1.5 bg-slate-900 text-white hover:bg-slate-800 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                >
                  <UserPlus className="h-4 w-4" /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
