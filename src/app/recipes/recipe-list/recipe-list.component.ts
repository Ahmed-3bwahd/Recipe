import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes : Recipe[];
  subscrition: Subscription

  constructor(private recipeservice: RecipeService) { }

  ngOnInit() {
    this.subscrition= this.recipeservice.recipechanged.subscribe(
      (recipe: Recipe[]) => {
        this.recipes = recipe
      });
    this.recipes = this.recipeservice.getRecipe();
  }
  ngOnDestroy(){ this.subscrition.unsubscribe() }

}
