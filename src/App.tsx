import React, { useState } from 'react';
import { RefreshCw, Heart, Utensils } from 'lucide-react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { RecipeCard } from './components/RecipeCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AIRecipeService } from './utils/aiService';
import { Recipe, SearchFilters } from './types/recipe';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState('');
  const [lastFilters, setLastFilters] = useState<SearchFilters>({ dietary: [] });
  const [savedRecipes, setSavedRecipes] = useState<Set<string>>(new Set());

  const handleSearch = async (query: string, filters: SearchFilters) => {
    setIsLoading(true);
    setHasSearched(true);
    setLastQuery(query);
    setLastFilters(filters);
    
    try {
      const generatedRecipes = await AIRecipeService.generateRecipes(query, filters);
      setRecipes(generatedRecipes);
    } catch (error) {
      console.error('Erreur lors de la génération des recettes:', error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastQuery) {
      handleSearch(lastQuery, lastFilters);
    }
  };

  const handleSaveRecipe = (recipe: Recipe) => {
    setSavedRecipes(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(recipe.id)) {
        newSaved.delete(recipe.id);
      } else {
        newSaved.add(recipe.id);
      }
      return newSaved;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 flex justify-center">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {isLoading && <LoadingSpinner />}

          {!isLoading && hasSearched && recipes.length === 0 && (
            <div className="text-center py-12">
              <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune recette trouvée</h3>
              <p className="text-gray-500">Essayez avec d'autres ingrédients ou ajustez vos filtres.</p>
            </div>
          )}

          {!isLoading && recipes.length > 0 && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Recettes générées ({recipes.length})
                  </h2>
                  <p className="text-gray-600">Basées sur votre recherche: "{lastQuery}"</p>
                </div>
                <button
                  onClick={handleRegenerate}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-orange-200 text-orange-600 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  Nouvelles recettes
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onSave={handleSaveRecipe}
                    isSaved={savedRecipes.has(recipe.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {!hasSearched && (
            <div className="text-center py-16">
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Utensils className="w-10 h-10 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Prêt à cuisiner ?
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Décrivez vos envies culinaires et laissez notre IA créer des recettes uniques pour vous.
                    </p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4 text-left">
                    <div className="bg-orange-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-orange-800 mb-2">Exemples de recherche</h4>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• "Pasta au saumon et épinards"</li>
                        <li>• "Dessert aux pommes sans gluten"</li>
                        <li>• "Salade végan protéinée"</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-green-800 mb-2">Filtres disponibles</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Régimes alimentaires</li>
                        <li>• Temps de préparation</li>
                        <li>• Niveau de difficulté</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {savedRecipes.size > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-6 h-6 text-red-500 fill-current" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Recettes sauvegardées ({savedRecipes.size})
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes
                  .filter(recipe => savedRecipes.has(recipe.id))
                  .map(recipe => (
                    <RecipeCard
                      key={`saved-${recipe.id}`}
                      recipe={recipe}
                      onSave={handleSaveRecipe}
                      isSaved={true}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 CuisineAI - Générez vos recettes avec l'intelligence artificielle</p>
        </div>
      </footer>
    </div>
  );
}

export default App;