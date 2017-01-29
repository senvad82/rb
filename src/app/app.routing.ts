import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./home.component";


const APP_ROUTES: Routes = [
  {path: '', component:HomeComponent, pathMatch: 'full'},
  {path: 'recipes', loadChildren:'app/recipes/recipe.module#RecipeModule' },
  {path: 'shopping-list', loadChildren:'app/shopping-list/shopping-list.module#ShoppingListModule'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
