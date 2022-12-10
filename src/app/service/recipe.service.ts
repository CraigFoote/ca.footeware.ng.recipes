import { Injectable } from "@angular/core";
import { Recipe } from "../model/recipe";

@Injectable({
    providedIn: "root"
})
export class RecipeService {
    private RECIPES = [
        new Recipe("id01", "name1", "body1", ["tag1", "tag2"]),
        new Recipe("id02", "name2", "body2", ["tag1", "tag3"]),
        new Recipe("id03", "name3", "body3", ["tag1", "tag2"]),
        new Recipe("id04", "name4", "body4", ["tag1", "tag4"])
    ];

    getAllRecipes(): Array<Recipe> {
        return this.RECIPES;
    }

    getAllTags(): Array<String> {
        return ["tag1", "tag2", "tag3", "tag4"];
    }

    search(term: string): Array<Recipe> {
        return [ this.RECIPES[0] ];
    }
}