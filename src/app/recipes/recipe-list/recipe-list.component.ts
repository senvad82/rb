import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe'
@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
  
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[] =[];
  recipe= new Recipe("Pasta ", "Italian Recipe", "./images/pasta.jpg")
  constructor() { }

  ngOnInit() {
  }

}
