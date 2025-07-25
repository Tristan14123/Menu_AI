import React, { useState } from 'react';
import { Search, Filter, Clock, ChefHat } from 'lucide-react';
import { SearchFilters } from '../types/recipe';

interface SearchFormProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    dietary: [],
    maxTime: undefined,
    difficulty: undefined
  });

  const dietaryOptions = ['Végétarien', 'Végan', 'Sans gluten', 'Sans lactose', 'Keto'];
  const difficultyOptions = ['Facile', 'Moyen', 'Difficile'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, filters);
    }
  };

  const toggleDietary = (option: string) => {
    setFilters(prev => ({
      ...prev,
      dietary: prev.dietary.includes(option)
        ? prev.dietary.filter(d => d !== option)
        : [...prev.dietary, option]
    }));
  };

  return (
    <div className="w-full max-w-4xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Propose-moi une recette avec du poulet et des pâtes..."
            className="w-full pl-12 pr-32 py-4 text-lg border-2 border-orange-200 rounded-2xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-xl transition-colors ${
                showFilters ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ChefHat className="w-4 h-4" />
              )}
              {isLoading ? 'Génération...' : 'Générer'}
            </button>
          </div>
        </div>
      </form>

      {showFilters && (
        <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtres</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Régime alimentaire</label>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleDietary(option)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                      filters.dietary.includes(option)
                        ? 'bg-green-100 text-green-700 border-2 border-green-300'
                        : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temps maximum (minutes)
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="number"
                    value={filters.maxTime || ''}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      maxTime: e.target.value ? parseInt(e.target.value) : undefined
                    }))}
                    placeholder="Ex: 60"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulté</label>
                <select
                  value={filters.difficulty || ''}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    difficulty: e.target.value || undefined
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                >
                  <option value="">Toutes</option>
                  {difficultyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};