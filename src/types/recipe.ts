export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  dietaryTags: string[];
  image?: string;
}

export interface SearchFilters {
  dietary: string[];
  maxTime?: number;
  difficulty?: string;
}