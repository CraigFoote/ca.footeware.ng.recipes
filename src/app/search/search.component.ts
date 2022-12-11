import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Recipe } from "../model/recipe";
import { RecipeService } from "../service/recipe.service";

@Component({
  selector: "search-root",
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  term!: string;
  private sub: any;
  recipes: Array<Recipe> = [];

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  search(searchTermRaw: string): void {
    this.term = searchTermRaw.toString().trim().toLowerCase();
    this.recipes = this.recipeService.search(this.term);
  }

  getAllTags(): Array<String> {
    return this.recipeService.getAllTags();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.term = params['term'];
      if (this.term != undefined) {
        this.recipes = this.recipeService.search(this.term);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}