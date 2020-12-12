import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataSorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})

export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private storageData: DataSorageService,
    private recipeser: RecipeService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recipeser.getRecipe();
    if(recipes.length === 0){
      return this.storageData.fetchData();
    }else{
      return recipes;
    }

  }
}
