import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Recipe } from "../model/recipe";
import { RecipeService } from "../service/recipe.service";
import { PageEvent } from '@angular/material/paginator';
import { PagingDTO } from "../model/pagingDTO";

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
  allTags: Array<string> = [];
  length!: number;
  pageSize = 10;
  pageNumber = 0;
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    // search params
    this.sub = this.route.params.subscribe(params => {
      this.term = params['term'];
      const tag = params['tag'];
      this.pageNumber = 0;
      if (this.term != undefined && tag == undefined) {
        this.term = this.term.toString().trim().toLowerCase();
        this.searchAll(this.term);
      } else if (this.term == undefined && tag != undefined) {
        this.tag = tag;
        this.searchTags(this.tag);
      }
    });
    // wait for all tags
    this.loading = true;
    this.recipeService.getAllTags().subscribe({
      next: data => {
        this.allTags = data;
        this.loading = false;
      },
      error: error => {
        console.error('There was an error!', error.message);
        this.loading = false;
        alert(error.message);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  search(arg0: string) {
    if (arg0 != undefined && arg0.trim().length > 0) {
      this.pageNumber = 0;
      this.tag = "";
      this.term = arg0;
      this.term = this.term.toString().trim().toLowerCase();
      this.searchAll(this.term);
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageNumber = e.pageIndex;
    if (this.tag != undefined && this.tag.length > 0) {
      this.searchTags(this.tag);
    } else {
      this.searchAll(this.term);
    }
  }

  private searchAll(term: string) {
    // wait for response
    this.loading = true;
    const results = this.recipeService.searchAllByPage(term, this.pageNumber, this.pageSize).subscribe({
      next: data => {
        const dto: PagingDTO = data;
        this.length = dto.total;
        this.recipes = dto.recipes;
        this.loading = false;
      },
      error: error => {
        console.error('There was an error!', error.message);
        this.loading = false;
        alert(error.message);
      }
    });
  }

  private searchTags(tag: string) {
    // wait for response
    this.loading = true;
    const results = this.recipeService.searchTagsByPage(tag, this.pageNumber, this.pageSize).subscribe({
      next: data => {
        const dto: PagingDTO = data;
        this.length = dto.total;
        this.recipes = dto.recipes;
        this.loading = false;
      },
      error: error => {
        console.error('There was an error!', error.message);
        this.loading = false;
        alert(error.message);
      }
    });
  }
}
