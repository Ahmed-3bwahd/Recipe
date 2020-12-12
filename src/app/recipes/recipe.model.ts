import { Ingredient } from '../shared/ingredient.model';

export class Recipe{
  public Recipename: string;
  public description : string;
  public imagepath : string;
  public ingredient: Ingredient[]

  constructor(name:string ,desc:string ,imgpath:string, iNgredient: Ingredient[]){
    this.Recipename  = name;
    this.description = desc;
    this.imagepath   = imgpath;
    this.ingredient  = iNgredient;
  }
}
