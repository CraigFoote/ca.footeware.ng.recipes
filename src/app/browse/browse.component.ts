import { Component } from "@angular/core";
import { Recipe } from "../model/recipe";
import { RecipeService } from "../service/recipe.service";

@Component({
    selector: "browse-root",
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.css']
})
export class BrowseComponent {
    constructor(private recipeService: RecipeService) { }

    recipes(): Array<Recipe> {
        return this.recipeService.getAllRecipes();
    }
}