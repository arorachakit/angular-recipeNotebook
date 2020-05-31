import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})

export class RecipeService{


   //  private recipes: Recipe[] = [
   //      new Recipe('Burger', 'Super Tasty Chicken Burger', 'https://www.kitchensanctuary.com/wp-content/uploads/2019/08/Crispy-Chicken-Burger-updated-square-Nov2019-500x375.jpg', [
   //          new Ingredient('Chicken Tikky', 3), new Ingredient('Bun', 1)
   //      ]),
   //      new Recipe('Butter Chicken', 'What else do I need to say?', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-191119-butter-chicken-0375-landscape-pf-1574729676.jpg?crop=0.668xw:1.00xh;0.173xw,0&resize=480:*',[
   //          new Ingredient("Chicken", 2), new Ingredient('Butter', 1), new Ingredient('Breads', 5)
   //      ])
   //   ];

    private recipes: Recipe[] = [];
     
     recipeChange = new Subject<Recipe[]>()

     constructor(private shoppingListService: ShoppingListService){}

     setRecipes(recipes : Recipe[]){
        this.recipes = recipes;
        this.recipeChange.next(this.recipes.slice());
     }

     getRecipes(){
         return this.recipes.slice();
     }

     getRecipe(id: number): Recipe{
         return this.recipes[id];
     }
     addIngredientToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
     }

     addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChange.next(this.recipes.slice());
     }

     updateRecipe(index: number , recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipeChange.next(this.recipes.slice());
     }

     deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChange.next(this.recipes.slice());
     }
}