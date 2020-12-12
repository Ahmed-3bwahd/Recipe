import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';


@Injectable()
export class RecipeService{

  recipechanged = new Subject<Recipe[]>()
  private recipesArrServ : Recipe[] = []

  /*  private recipesArrServ : Recipe[] = [
    new Recipe(
      'Minced pork rice',
      'Minced pork rice is a Taiwanese style rice dish commonly seen throughout Taiwan that many people enjoy local cuisine',
      '../../../assets/imgs/1.jpg',
      [
        new Ingredient('Bread' , 5),
        new Ingredient('rice', 6)
      ]),

    new Recipe(
      'Chicken & Mushroom risotto',
      'There is no any dish that could be called as a great or terrible one, only you like or dislike as the taste is quite subjective',
      '../../../assets/imgs/2.jpg',
      [
        new Ingredient('Bread' , 5),
        new Ingredient('meat', 2)
      ])
  ];
  */

  constructor(private shopservice: ShoppingService){}

  getRecipe(){
    return this.recipesArrServ.slice();
  }

  getrecipebyid(index: number){
    return this.recipesArrServ[index];
  }

  setrecipes(recipes: Recipe[]){
    this.recipesArrServ = recipes;
    this.recipechanged.next(this.recipesArrServ.slice());
  }

  Onpassingredients(ingreds: Ingredient[]){
    this.shopservice.AddIngredients(ingreds)
  }

  onaddrecipe(recipe: Recipe){
    this.recipesArrServ.push(recipe);
    this.recipechanged.next(this.recipesArrServ.slice());
  }

  onupdaterecipe(index: number ,newrecipe: Recipe){
    this.recipesArrServ[index] = newrecipe;
    this.recipechanged.next(this.recipesArrServ.slice());
  }

  ondeleterecipe(index: number){
    this.recipesArrServ.splice(index, 1);
    this.recipechanged.next(this.recipesArrServ.slice());
  }
}
