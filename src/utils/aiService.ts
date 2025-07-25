import { Recipe } from '../types/recipe';

// Simulation d'un service IA - en production, vous intégreriez une vraie API
export class AIRecipeService {
  private static recipes: Recipe[] = [
    {
      id: '1',
      name: 'Pasta au Poulet Crémeux',
      description: 'Des pâtes onctueuses avec du poulet tendre dans une sauce crémeuse aux herbes.',
      ingredients: [
        '400g de pâtes (penne ou fusilli)',
        '2 blancs de poulet',
        '200ml de crème fraîche',
        '1 oignon',
        '3 gousses d\'ail',
        '100g de champignons',
        'Herbes de Provence',
        'Sel et poivre',
        'Huile d\'olive'
      ],
      instructions: [
        'Faire cuire les pâtes selon les instructions du paquet.',
        'Couper le poulet en dés et le faire revenir dans une poêle avec l\'huile d\'olive.',
        'Ajouter l\'oignon émincé et l\'ail haché, faire revenir 3 minutes.',
        'Incorporer les champignons et cuire 5 minutes.',
        'Verser la crème fraîche, assaisonner avec les herbes, sel et poivre.',
        'Mélanger avec les pâtes égouttées et servir immédiatement.'
      ],
      prepTime: 15,
      cookTime: 25,
      servings: 4,
      difficulty: 'Facile',
      dietaryTags: [],
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg'
    },
    {
      id: '2',
      name: 'Salade de Quinoa Méditerranéenne',
      description: 'Une salade fraîche et nutritive avec du quinoa, légumes et feta.',
      ingredients: [
        '200g de quinoa',
        '1 concombre',
        '200g de tomates cerises',
        '100g de feta',
        '1/2 oignon rouge',
        '50g d\'olives noires',
        'Menthe fraîche',
        'Huile d\'olive',
        'Jus de citron',
        'Sel et poivre'
      ],
      instructions: [
        'Rincer le quinoa et le cuire dans l\'eau bouillante salée pendant 15 minutes.',
        'Laisser refroidir le quinoa cuit.',
        'Couper le concombre en dés, les tomates cerises en deux.',
        'Émincer l\'oignon rouge finement.',
        'Mélanger tous les légumes avec le quinoa refroidi.',
        'Ajouter la feta émiettée, les olives et la menthe.',
        'Assaisonner avec l\'huile d\'olive, le jus de citron, sel et poivre.'
      ],
      prepTime: 20,
      cookTime: 15,
      servings: 4,
      difficulty: 'Facile',
      dietaryTags: ['Végétarien', 'Sans gluten'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
    },
    {
      id: '3',
      name: 'Curry de Légumes Végan',
      description: 'Un curry épicé et savoureux avec des légumes de saison et lait de coco.',
      ingredients: [
        '1 aubergine',
        '2 courgettes',
        '1 poivron rouge',
        '400ml de lait de coco',
        '2 cuillères à soupe de pâte de curry',
        '1 oignon',
        '3 gousses d\'ail',
        '1 morceau de gingembre',
        '400g de tomates concassées',
        'Épinards frais',
        'Coriandre fraîche',
        'Riz basmati'
      ],
      instructions: [
        'Couper tous les légumes en cubes.',
        'Faire revenir l\'oignon, l\'ail et le gingembre dans une poêle.',
        'Ajouter la pâte de curry et cuire 1 minute.',
        'Incorporer les légumes et les tomates concassées.',
        'Verser le lait de coco et laisser mijoter 20 minutes.',
        'Ajouter les épinards en fin de cuisson.',
        'Servir avec du riz basmati et de la coriandre fraîche.'
      ],
      prepTime: 20,
      cookTime: 30,
      servings: 4,
      difficulty: 'Moyen',
      dietaryTags: ['Végan', 'Sans gluten'],
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg'
    }
  ];

  static async generateRecipes(query: string, filters: any): Promise<Recipe[]> {
    // Simulation d'un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Logique simple de filtrage basée sur la requête
    let filtered = [...this.recipes];

    // Filtrer par régime alimentaire
    if (filters.dietary && filters.dietary.length > 0) {
      filtered = filtered.filter(recipe => 
        filters.dietary.some((diet: string) => recipe.dietaryTags.includes(diet))
      );
    }

    // Filtrer par temps maximum
    if (filters.maxTime) {
      filtered = filtered.filter(recipe => 
        (recipe.prepTime + recipe.cookTime) <= filters.maxTime
      );
    }

    // Filtrer par difficulté
    if (filters.difficulty) {
      filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
    }

    // Si aucun résultat, retourner des recettes aléatoires
    if (filtered.length === 0) {
      filtered = this.recipes.slice(0, 2);
    }

    return filtered.slice(0, 3); // Limiter à 3 résultats
  }
}