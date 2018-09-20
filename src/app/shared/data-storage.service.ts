import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';

import 'rxjs/Rx';
import {RecipeService} from '../recipes/recipe.service';
import {RecipeModel} from '../recipes/recipe.model';

import {subscribeTo} from 'rxjs/internal-compatibility';
import {AuthService} from '../auth/auth.service';


@Injectable()
export  class DataStorageService {

  constructor (private http: Http, private recipeService: RecipeService,
               private  authService:AuthService) {}


  storeRecipes(){

    const token = this.authService.getToken();

    return  this.http.put('https://ng-recipe-book-de1cb' +
      '.firebaseio.com/recipes.json?auth=' +token,
      this.recipeService.getRecipes());
  }

  getRecipes(){
   const token = this.authService.getToken();



     this.http.get('https://ng-recipe-book-de1cb.firebaseio.com' +
       '/recipes.json?auth=' +token)
       .map(
        (response: Response )  =>{
          const recipes : RecipeModel[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']){
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
         .subscribe(
        (recipes: RecipeModel[]) => {
          this.recipeService.setRecipe(recipes);
        }
      );
  }


}
