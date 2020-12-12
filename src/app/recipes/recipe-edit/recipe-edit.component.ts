import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editmode = false;
  recipeForm : FormGroup

  constructor(
    private actroute: ActivatedRoute,
    private recipeservice: RecipeService,
    private router: Router) {}

  ngOnInit() {
    this.actroute.params.subscribe(
      (para: Params) => {
        this.id = para['id'];
        this.editmode = para['id'] != null;
        this.initform();
      });
  }

  onsubmit(){
    const newrecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imgpath'],
      this.recipeForm.value['ingredient']
    );
    if(this.editmode){
      this.recipeservice.onupdaterecipe(this.id, newrecipe);
    }else{
      this.recipeservice.onaddrecipe(newrecipe)
    };
    this.oncancel()
  }

  oncancel(){ this.router.navigate(['../'], {relativeTo: this.actroute}); }

  getControls() { return (<FormArray>this.recipeForm.get('ingredient')).controls; }

  private initform(){
    let reciname= '' ;
    let recimgpath= '' ;
    let recidesc= '';
    let recingreds = new FormArray([])

    if(this.editmode){
      const recipe = this.recipeservice.getrecipebyid(this.id);
      reciname = recipe.Recipename;
      recimgpath = recipe.imagepath;
      recidesc = recipe.description;

      if(recipe['ingredient']){
        for(let ingred of recipe.ingredient){
          recingreds.push(
            new FormGroup({
              'ingredname': new FormControl(ingred.ingredname, Validators.required),
              'amount' :new FormControl(ingred.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            }) ) } };
    }
    this.recipeForm = new FormGroup({
      'name' : new FormControl(reciname, Validators.required),
      'imgpath' : new FormControl(recimgpath, Validators.required),
      'description' : new FormControl(recidesc, Validators.required),
      'ingredient' : recingreds
    })
  }

  addingred(){
    (<FormArray>this.recipeForm.get('ingredient')).push(
      new FormGroup({
        'ingredname': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      }) );
  }

  ondeleteingred(index: number){
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }

}
