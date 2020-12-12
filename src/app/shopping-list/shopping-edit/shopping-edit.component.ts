import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: true}) slform: NgForm;
  destsub: Subscription;
  indexeditgred: number;
  editmode = false;
  editedingred: Ingredient

  constructor(private shopservice: ShoppingService) { }

  ngOnInit() {
    this.destsub = this.shopservice.editgred.subscribe(
      (index: number) => {
        this.indexeditgred = index;
        this.editmode = true;
        this.editedingred = this.shopservice.getingredbyindex(index);
        this.slform.setValue({
          name: this.editedingred.ingredname,
          amount: this.editedingred.amount
        })
      });

  }

  OnAddItem(){
    const val= this.slform.value;
    const fetchedingred = new Ingredient(val.name, val.amount);
    if(this.editmode){
      this.shopservice.updateingred(this.indexeditgred, fetchedingred);
      this.onclear()
    }else{
      this.shopservice.onAddItemser(fetchedingred);
      this.onclear();
    }
  }

  onclear(){
    this.slform.reset();
    this.editmode = false
  }

  ondelete(){
    this.shopservice.deleteingred(this.indexeditgred);
    this.onclear();
  }

  ngOnDestroy(){
    this.destsub.unsubscribe();
  }
}
