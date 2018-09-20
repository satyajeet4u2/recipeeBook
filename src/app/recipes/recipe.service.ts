import {RecipeModel} from './recipe.model';
import {EventEmitter,Injectable} from '@angular/core';
import {IngredientModel} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
import index from '@angular/cli/lib/cli';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<RecipeModel[]>();



//recipeSelected = new EventEmitter<RecipeModel>();

 private recipes: RecipeModel[] = [
    new RecipeModel('What you Need',
      'Good Quality',
      'https://www.ndtv.com/cooks/images/Vegetarian%20Khow%20Suey.jpg',
    [
      new IngredientModel('Wheat',2),
        new IngredientModel('French Fries',30)
        ]),

    new RecipeModel('Choose Food Items',
      'Food',
      'https://www.campbellsoup.co.uk/img/recipes/6-campbells-vegetarian-pizza-recipe.jpg',
    [
      new IngredientModel('Buns',9),
        new IngredientModel('Bread',6)
        ])
  ];

 constructor(private slService: ShoppingListService){}


 setRecipe(recipes :RecipeModel[]){
   this.recipes = recipes;
   this.recipesChanged.next(this.recipes.slice());

 }

  getRecipes(){
    return this.recipes.slice();
  }


  getRecipe(index: number){
   return this.recipes[index];
  }


  addIngredientsToShoppingList(ingredients: IngredientModel[]){
    this.slService.addIngredients(ingredients);
  }


  addRecipe(recipe: RecipeModel){
   this.recipes.push(recipe);
   this.recipesChanged.next(this.recipes.slice());
  }



  updateRecipe(index : number, newRecipe: RecipeModel){
   this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }


  deleteRecipe(index : number){
   this.recipes.splice(index, 1);
   this.recipesChanged.next(this.recipes.slice());
  }
}
