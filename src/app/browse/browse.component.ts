import { Component } from "@angular/core";
import { Recipe } from "../model/recipe";
import { RecipeService } from "../service/recipe.service.mock";
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: "browse-root",
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.css']
})
export class BrowseComponent {
    length!: number;
    pageSize = 2;
    pageIndex = 0;
    pageEvent!: PageEvent;

    constructor(private recipeService: RecipeService) { }

    recipes(): Array<Recipe> {
        const results = this.recipeService.getAllRecipes();
        this.length = results.length;
        return results.slice();
    }

    handlePageEvent(e: PageEvent) {
        this.pageEvent = e;
        console.log(e);
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
    }
}