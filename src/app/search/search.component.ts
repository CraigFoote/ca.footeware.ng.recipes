import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { Recipe } from "../model/recipe";
import { RecipeService } from "../service/recipe.service";

@Component({
    selector: "search-root",
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {
    constructor(private recipeService: RecipeService) { }

    search(term: string): Array<Recipe> {
        return this.recipeService.search(term);
    }

    getAllTags(): Array<String> {
        return this.recipeService.getAllTags();
    }

    keywords = ['angular', 'how-to', 'tutorial', 'accessibility'];
    formControl = new FormControl(['angular']);
  
    removeKeyword(keyword: string) {
      const index = this.keywords.indexOf(keyword);
      if (index >= 0) {
        this.keywords.splice(index, 1);
      }
    }
  
    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
  
      // Add our keyword
      if (value) {
        this.keywords.push(value);
      }
  
      // Clear the input value
      event.chipInput!.clear();
    }
}