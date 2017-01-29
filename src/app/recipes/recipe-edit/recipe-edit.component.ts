import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from "../recipe.service";
import { Subscription } from "rxjs/Rx";
import {FormArray, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { Recipe } from "../recipe";
@Component({
  selector: 'rb-recipe-edit',
  templateUrl: 'recipe-edit.component.html',
  styles: []
  
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private recipeIndex:number;
  private recipe:Recipe;
  private subscription:Subscription;
  private isNew = true;
  private recipeForm: FormGroup;
  constructor(private route:ActivatedRoute,private srs:RecipeService, private formBuilder:FormBuilder, private router:Router) {}

  ngOnInit() {
    
    this.subscription = this.route.params.subscribe(
      (params:any) => {
        if (params.hasOwnProperty('id')){
          this.isNew = false;
          this.recipeIndex = +params['id'];
          this.recipe = this.srs.getRecipe(this.recipeIndex);
        }else{
          this.isNew= true;
        }
        console.log(this.isNew);
      }
    );

    this.initForm();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(){
    console.log('onSubmit');
    const newRecipe = this.recipeForm.value;
    console.log(newRecipe);
    if(this.isNew){
      this.srs.addRecipe(newRecipe)
    }else{
      this.srs.editRecipe(this.recipe,newRecipe)
    }
    this.onNavigateBack();
  }

  onCancel(){
    this.onNavigateBack();
  }
  onNavigateBack(){
    this.router.navigate(['../'])
  }

  onRemoveItem(index:number){
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }
  
  onAddItem(name:string, amount:string){
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup(
            {
              name : new FormControl(name, Validators.required),
              amount: new FormControl(amount, [Validators.required, Validators.pattern("\\d+")])
            }
          )
    );
  }

  private initForm(){
    let recipeName ='';
    let recipeImageUrl = '';
    let recipeContent = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if (!this.isNew){
      if(this.recipe.hasOwnProperty('ingredients')){
      for(let i=0; i < this.recipe.ingredients.length; i++){
        recipeIngredients.push(
          new FormGroup(
            {
              name : new FormControl(this.recipe.ingredients[i].name, Validators.required),
              amount: new FormControl(this.recipe.ingredients[i].amount, [Validators.required, Validators.pattern("\\d+")])
            }
          )
        );
      }}
      recipeName = this.recipe.name;
      recipeImageUrl = this.recipe.imagePath;
      recipeContent = this.recipe.description;

      

    }
    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath : [recipeImageUrl, Validators.required],
      description : [recipeContent, Validators.required],
      ingredients: recipeIngredients
      });
  }
}
