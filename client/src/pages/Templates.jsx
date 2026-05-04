import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import TemplateCard from '../components/TemplateCard';
import { AuthContext } from '../context/AuthContext';
import { Search, Filter, LayoutTemplate, Sparkles } from 'lucide-react';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { user } = useContext(AuthContext);

  const categories = ['Dashboard', 'E-commerce', 'Portfolio', 'Landing Page', 'Blog'];

  useEffect(() => {
    fetchData();
  }, [search, category, user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let url = '/templates';
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const templatesRes = await api.get(url);
      
      let userFavorites = [];
      if (user) {
        const favRes = await api.get('/favorites');
        userFavorites = favRes.data.map(f => f.id);
      }

      const templatesWithFavStatus = templatesRes.data.map(t => ({
        ...t,
        is_favorited: userFavorites.includes(t.id)
      }));

      setTemplates(templatesWithFavStatus);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (templateId, isFavorited) => {
    setTemplates(prev => prev.map(t => 
      t.id === templateId ? { ...t, is_favorited: isFavorited } : t
    ));
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 text-white py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Premium Collection</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-primary-300">
            Beautiful Templates <br className="hidden sm:block" /> for Next-Gen Apps
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light">
            Kickstart your next big idea with our curated collection of production-ready, beautifully designed templates.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10">
        
        {/* Controls */}
        <div className="glass rounded-2xl p-4 sm:p-6 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl shadow-slate-200/50">
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm transition-all duration-300 shadow-sm"
              placeholder="Search templates by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-auto flex items-center gap-4">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-slate-400" />
              </div>
              <select
                className="block w-full pl-11 pr-10 py-3.5 border border-slate-200 rounded-xl leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm appearance-none transition-all duration-300 shadow-sm font-medium text-slate-700 cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-slate-500 font-medium animate-pulse">Loading amazing templates...</p>
          </div>
        ) : templates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <div key={template.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <TemplateCard 
                  template={template} 
                  onFavoriteToggle={handleFavoriteToggle}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 glass rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <LayoutTemplate className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No templates found</h3>
            <p className="text-slate-500 max-w-md mx-auto">We couldn't find any templates matching your current filters. Try adjusting your search or category.</p>
            <button 
              onClick={() => {setSearch(''); setCategory('');}}
              className="mt-8 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 hover:text-primary-600 transition-colors shadow-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
