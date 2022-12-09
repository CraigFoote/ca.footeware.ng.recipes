import { Injectable } from "@angular/core";
import { Recipe } from "../model/recipe";

@Injectable({
    providedIn: "root"
})
export class RecipeService {
    get(path: string): Array<Recipe> {
        return [
            new Recipe("id01", "name1", "body1", ["tag1", "tag2"]),
            new Recipe("id02", "name2", "body2", ["tag1", "tag3"])
        ];
    }
}