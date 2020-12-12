import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { tap, map, take, exhaustMap } from 'rxjs/operators'
import { AuthserviceService } from '../auth/authservice.service';

@Injectable({providedIn: 'root'})
export class DataSorageService {
  constructor(
    private http: HttpClient,
    private recipeservice: RecipeService,
    private authser: AuthserviceService){}

  storageData(){
    const recipe = this.recipeservice.getRecipe();
    return this.authser.user.pipe(
      take(1),
      exhaustMap( user => {
        return this.http.put(
          'https://ng-complete-guide-9042d.firebaseio.com/recies.json',
          recipe,
          { params: new HttpParams().set('auth', user.token) });
      })
    )
    .subscribe(response =>{
      console.log(response);
    });

    /* const recipe = this.recipeservice.getRecipe();
    this.http.put(
      'https://ng-complete-guide-9042d.firebaseio.com/recies.json',
      recipe).subscribe(response =>{
        console.log(response);
      }); */
  }

  fetchData(){
    return this.authser.user.pipe(
      take(1),
      exhaustMap( user => {
        return this.http.get<Recipe[]>(
          'https://ng-complete-guide-9042d.firebaseio.com/recies.json',
          {
            params: new HttpParams().set('auth', user.token)
          });
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredient: recipe.ingredient ? recipe.ingredient : []};
        });
      }),
      tap(
        recipes => {
        this.recipeservice.setrecipes(recipes);
        })
    );

    /*************** fetching data from firebase without Authentication *********************
    return this.http.get<Recipe[]>('https://ng-complete-guide-9042d.firebaseio.com/recies.json')
    .pipe(
      map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredient: recipe.ingredient ? recipe.ingredient : []};
      });
    }),
    tap(
      recipes => {
      this.recipeservice.setrecipes(recipes);
      })
    ) */
  }
}
