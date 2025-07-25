import React from 'react';
import { Clock, Users, ChefHat, Heart } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onSave?: (recipe: Recipe) => void;
  isSaved?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSave, isSaved = false }) => {
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'text-green-600 bg-green-100';
      case 'Moyen': return 'text-yellow-600 bg-yellow-100';
      case 'Difficile': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {recipe.image && (
        <div className="h-48 overflow-hidden relative">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {onSave && (
            <button
              onClick={() => onSave(recipe)}
              className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                isSaved 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 leading-tight">{recipe.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{totalTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} pers.</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            <span>Prép: {recipe.prepTime}min</span>
          </div>
        </div>

        {recipe.dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.dietaryTags.map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Ingrédients ({recipe.ingredients.length})</h4>
            <ul className="text-sm text-gray-600 space-y-1 max-h-24 overflow-y-auto">
              {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {ingredient}
                </li>
              ))}
              {recipe.ingredients.length > 4 && (
                <li className="text-orange-500 font-medium">
                  +{recipe.ingredients.length - 4} autres ingrédients...
                </li>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Instructions</h4>
            <ol className="text-sm text-gray-600 space-y-1 max-h-32 overflow-y-auto">
              {recipe.instructions.slice(0, 3).map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
              {recipe.instructions.length > 3 && (
                <li className="text-orange-500 font-medium ml-7">
                  +{recipe.instructions.length - 3} autres étapes...
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};