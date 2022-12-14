import { Component, OnInit } from "@angular/core";
import { Recipe } from "../model/recipe";
import { RecipeService } from "../service/recipe.service.mock";
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: "browse-root",
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
    length!: number;
    pageSize = 2;
    pageIndex = 0;
    recipes!: Recipe[];

    constructor(private recipeService: RecipeService) { }

    ngOnInit(): void {
        this.getRecipes(this.pageIndex + 1, this.pageSize);
    }

    handlePageEvent(e: PageEvent) {
        this.pageIndex = e.pageIndex;
        this.getRecipes(this.pageIndex + 1, this.pageSize);
    }

    private getRecipes(pageIndex: number, pageSize: number) {
        const results = this.recipeService.getRecipesByPage(pageIndex, this.pageSize);
        this.length = results[0];
        this.recipes = results[1];
        for (const r of this.recipes) {
            console.log(r.name);
        }
    }
}
