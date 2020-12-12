import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingService{
  ingredchangeed = new Subject<Ingredient[]>();
  editgred= new Subject<number>()

  ingredientsArrSer: Ingredient[] = [
    new Ingredient('Apple' , 5),
    new Ingredient('Orange' , 10)
  ];

  onAddItemser(ingreditem: Ingredient){
    this.ingredientsArrSer.push(ingreditem);
    this.ingredchangeed.next(this.ingredientsArrSer.slice());
  }

  AddIngredients(ingredients: Ingredient[]){
    this.ingredientsArrSer.push(...ingredients);
    this.ingredchangeed.next(this.ingredientsArrSer.slice());
  }

  getingredbyindex(index: number){
    return this.ingredientsArrSer[index]
  }

  updateingred(index: number, newingred: Ingredient){
    this.ingredientsArrSer[index] = newingred;
    this.ingredchangeed.next(this.ingredientsArrSer.slice());
  }

  deleteingred(index: number){
    this.ingredientsArrSer.splice(index, 1);
    this.ingredchangeed.next(this.ingredientsArrSer.slice());
  }
}
