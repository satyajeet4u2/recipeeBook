import { Component, OnInit } from '@angular/core';
import {RecipeModel} from './recipe.model';
import {RecipeService} from './recipe.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']

})
export class RecipesComponent implements OnInit {

 // selectedRecipe: RecipeModel;

  constructor( private authService:AuthService

     // private recipeService: RecipeService

  ) { }

  ngOnInit() {


    //this.recipeService.recipeSelected.subscribe(
    //  (recipe :RecipeModel) => {
     //   this.selectedRecipe = recipe;

    //  }
   // );

  }

}
