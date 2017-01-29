import { Injectable, EventEmitter } from '@angular/core';
import { HttpModule, Headers, Http, Response } from '@angular/http';

import { Recipe } from "./recipe";
import { Ingredient } from "../shared";
import 'rxjs/Rx';

@Injectable()
export class RecipeService {
  public recipeChanged:EventEmitter<Recipe[]> = new EventEmitter<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Schnitzel', 'Very tasty', 'http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-8-edited-6.jpg', [
      new Ingredient('French Fries', 2),
      new Ingredient('Pork Meat', 1)
    ]),
    new Recipe('Schnitzel2', 'Very tasty1', 'http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-8-edited-6.jpg', [
      new Ingredient('French Fries', 2),
      new Ingredient('Pork Meat', 1)
    ]),
    new Recipe('Schnitzel3', 'Very tasty2', 'http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-8-edited-6.jpg', [
      new Ingredient('French Fries', 2),
      new Ingredient('Pork Meat', 1)
    ]),
    new Recipe('Schnitzel4', 'Very tasty3', 'http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-8-edited-6.jpg', [
      new Ingredient('French Fries', 2),
      new Ingredient('Pork Meat', 1)
    ]),
    new Recipe('Summer Salad', 'Okayish', 'http://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [])
  ];

  constructor(private http:Http) {}

  getRecipes() {
    return this.recipes;
  }
  
  getRecipe(id: number) {
    return this.recipes[id];
  }
  
  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
    console.log(this.recipes);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    console.log(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe:Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe ;
    console.log(newRecipe);
  }

  storeData(){
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'content-type':'application/json'

    })
    return this.http.put('https://senvadrb.firebaseio.com/recipe.json', body,{headers:headers});
  }

  fetchData(){
    this.http.get('https://senvadrb.firebaseio.com/recipe.json').map((response:Response)=>response.json()).subscribe(
      (response:Recipe[]) =>{
        console.log(response);
         this.recipes= response; 
         this.recipeChanged.emit(this.recipes);
      } 
    ); 
    console.log(this.recipes);
  }

}
