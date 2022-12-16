import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Recipe } from "../model/recipe";
import { RecipeService } from "../service/recipe.service.mock";
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: "search-root",
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  private sub: any;
  term!: string;
  tag!: string;
  recipes: Array<Recipe> = [];
  length!: number;
  pageSize = 10;
  pageIndex = 0;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  getAllTags(): Array<String> {
    return this.recipeService.getAllTags();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.term = params['term'];
      const tag = params['tag'];
      this.pageIndex = 0;
      if (this.term != undefined && tag == undefined) {
        this.term = this.term.toString().trim().toLowerCase();
        this.searchAll(this.term);
      } else if (this.term == undefined && tag != undefined) {
        this.tag = tag;
        this.searchTags(this.tag);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  search(arg0: string) {
    if (arg0 != undefined && arg0.trim().length > 0) {
      this.pageIndex = 0;
      this.tag = "";
      this.term = arg0;
      this.term = this.term.toString().trim().toLowerCase();
      this.searchAll(this.term);
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    if (this.tag != undefined && this.tag.length > 0) {
      this.searchTags(this.tag);
    } else {
      this.searchAll(this.term);
    }
  }

  private searchAll(term: string) {
    const results = this.recipeService.searchAllByPage(term, this.pageIndex + 1, this.pageSize);
    this.length = results[0];
    this.recipes = results[1];
  }

  private searchTags(tag: string) {
    const results = this.recipeService.searchTagsByPage(tag, this.pageIndex + 1, this.pageSize);
    this.length = results[0];
    this.recipes = results[1];
  }
}

