import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import 'rxjs/Rx';
@Component({
  selector: 'rb-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
  }

  onStore(){
    this.recipeService.storeData().subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  onFetch(){
    console.log('onfetch');
    this.recipeService.fetchData();
  }
}
