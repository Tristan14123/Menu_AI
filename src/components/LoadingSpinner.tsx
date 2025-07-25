import React from 'react';
import { ChefHat } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-orange-200 rounded-full animate-spin"></div>
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0 rotate-45"></div>
        <ChefHat className="w-6 h-6 text-orange-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="mt-4 text-gray-600 font-medium">L'IA cuisine vos recettes...</p>
      <p className="text-sm text-gray-400">Cela peut prendre quelques secondes</p>
    </div>
  );
};