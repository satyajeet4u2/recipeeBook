import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {RecipeModel} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

// @Output() recipeWasSelcted = new EventEmitter<RecipeModel>();

  recipes: RecipeModel[];
  subscription: Subscription;

  //  new RecipeModel('A test Grain', 'Good Quality', 'https://www.ndtv.com/cooks/images/Vegetarian%20Khow%20Suey.jpg'),
  // new RecipeModel('New Items', 'Food', 'https://www.campbellsoup.co.uk/img/recipes/6-campbells-vegetarian-pizza-recipe.jpg'),
  // ];


  constructor(private recipeService: RecipeService,
              private router: Router ,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

  this.subscription=  this.recipeService.recipesChanged
      .subscribe(
        (recipes :RecipeModel[]) => {
          this.recipes = recipes;
        }
      );

    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
this.router.navigate(['new'],
  {relativeTo: this.route });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
 // onRecipeSelected(recipe: RecipeModel){

  //  this.recipeWasSelcted.emit(recipe);
 // }

