import { Component, OnInit } from "@angular/core";
import { Recipe } from "../model/recipe";
import { RecipeService } from "../service/recipe.service";
import { PageEvent } from '@angular/material/paginator';
import { PagingDTO } from "../model/pagingDTO";

@Component({
    selector: "browse-root",
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
    length!: number;
    pageSize = 10;
    pageIndex = 0;
    recipes!: Recipe[];
    loading: boolean = false;

    constructor(private recipeService: RecipeService) { }

    ngOnInit(): void {
        this.getRecipes();
    }

    handlePageEvent(e: PageEvent) {
        this.pageIndex = e.pageIndex;
        this.getRecipes();
    }

    private getRecipes() {
        // wait for response
        this.loading = true;
        this.recipeService.getAllByPage(this.pageIndex, this.pageSize).subscribe({
            next: data => {
                const dto: PagingDTO = data;
                this.length = dto.total;
                this.recipes = dto.recipes;
                this.loading = false;
            },
            error: error => {
                console.error('There was an error!', error.message);
                this.loading = false;
            }
        });
    }
}
