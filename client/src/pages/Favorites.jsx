import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TemplateCard from '../components/TemplateCard';
import { Heart, Sparkles } from 'lucide-react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await api.get('/favorites');
      const templatesWithFavStatus = response.data.map(t => ({
        ...t,
        is_favorited: true
      }));
      setFavorites(templatesWithFavStatus);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (templateId, isFavorited) => {
    if (!isFavorited) {
      setFavorites(prev => prev.filter(t => t.id !== templateId));
    }
  };

  return (
    <div className="animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-gradient-to-b from-pink-50 to-transparent py-16 mb-8 border-b border-pink-100/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-600 border border-pink-200 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">Your Collection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight flex items-center gap-4 mb-4">
            <Heart className="h-10 w-10 text-pink-500 fill-pink-500 animate-pulse" />
            My Favorites
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl font-medium">
            All the amazing templates you've saved for your future projects, safely stored right here.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-pink-50"></div>
              <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-slate-500 font-medium animate-pulse">Loading your favorites...</p>
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((template, index) => (
              <div key={template.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <TemplateCard 
                  template={template} 
                  onFavoriteToggle={handleFavoriteToggle}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glass rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-transparent"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                <Heart className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No favorites yet</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-8">
                You haven't saved any templates yet. Explore our collection and click the heart icon to add some!
              </p>
              <a 
                href="/templates" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Explore Templates
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
