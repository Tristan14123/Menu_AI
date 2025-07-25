import React from 'react';
import { ChefHat, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <ChefHat className="w-12 h-12" />
              <Sparkles className="w-5 h-5 absolute -top-1 -right-1 text-yellow-300" />
            </div>
            <h1 className="text-4xl font-bold">CuisineAI</h1>
          </div>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Découvrez des recettes personnalisées générées par intelligence artificielle. 
            Dites-nous vos ingrédients, nous créons votre repas parfait !
          </p>
        </div>
      </div>
    </header>
  );
};