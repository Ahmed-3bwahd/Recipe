import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shopservice: ShoppingService) { }

  ngOnInit() {
    this.ingredients = this.shopservice.ingredientsArrSer;
  }

  oneditgred(index: number){
    this.shopservice.editgred.next(index);
  }

}
