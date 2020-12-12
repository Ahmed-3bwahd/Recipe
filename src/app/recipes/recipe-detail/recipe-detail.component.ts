import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  arrivedrecipe :Recipe;
  id : number

  constructor(
    private recipeservise: RecipeService,
    private actroute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.actroute.params.subscribe(
      (para: Params) => {
        this.id = +para['id'];
        this.arrivedrecipe = this.recipeservise.getrecipebyid(this.id);
      }
    );
  }

  Onsendingredients(){
    this.recipeservise.Onpassingredients(this.arrivedrecipe.ingredient)
  }

  deleterecipe(){
    this.recipeservise.ondeleterecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
