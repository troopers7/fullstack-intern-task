import React, { useContext, useState } from 'react';
import { Heart, ArrowUpRight } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TemplateCard = ({ template, onFavoriteToggle }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isFavoriting, setIsFavoriting] = useState(false);

  const handleFavoriteClick = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsFavoriting(true);
    try {
      const response = await api.post(`/favorites/${template.id}`);
      if (onFavoriteToggle) {
        onFavoriteToggle(template.id, response.data.favorited);
      }
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    } finally {
      setIsFavoriting(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 ease-out hover:-translate-y-1 animate-fade-in flex flex-col h-full">
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img 
          src={template.thumbnail_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'} 
          alt={template.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={handleFavoriteClick}
            disabled={isFavoriting}
            className={`p-2.5 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
              template.is_favorited 
                ? 'bg-white text-pink-500 border border-pink-100' 
                : 'bg-white/80 text-slate-400 border border-white/20 hover:text-pink-500 hover:bg-white'
            }`}
            aria-label="Toggle favorite"
          >
            <Heart 
              className={`h-5 w-5 transition-all duration-300 ${template.is_favorited ? 'fill-pink-500' : ''}`} 
            />
          </button>
        </div>
        
        <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-slate-900 shadow-sm backdrop-blur-md">
            {template.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-primary-600 transition-colors">
            {template.name}
          </h3>
        </div>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-6 flex-grow">
          {template.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-indigo-100 border border-white z-20"></div>
              <div className="w-6 h-6 rounded-full bg-purple-100 border border-white z-10"></div>
              <div className="w-6 h-6 rounded-full bg-pink-100 border border-white z-0"></div>
            </div>
            <span className="text-xs font-medium text-slate-400">+1k users</span>
          </div>
          <a 
            href={template.thumbnail_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-bold text-slate-900 hover:text-primary-600 transition-colors group/btn"
          >
            Preview
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
