import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Recipe } from "../model/recipe";
import { RecipeService } from "../service/recipe.service.mock";

@Component({
  selector: "search-root",
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  private sub: any;
  term!: string;
  recipes: Array<Recipe> = [];

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  getAllTags(): Array<String> {
    return this.recipeService.getAllTags();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.term = params['term'];
      const tag = params['tag'];
      if (this.term != undefined && tag == undefined) {
        this.recipes = this.recipeService.searchByAll(this.term.toString().trim().toLowerCase());
      } else if (this.term == undefined && tag != undefined) {
        this.term = tag;
        this.recipes = this.recipeService.searchByTag(this.term.toString().trim().toLowerCase());
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  search(arg0: string) {
    this.term = arg0;
    if (this.term != undefined) {
      this.recipes = this.recipeService.searchByAll(this.term.toString().trim().toLowerCase());
    }
  }
}