import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit, OnDestroy {
  private sub: any;
  recipe!: Recipe;
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private ngZone: NgZone, private router: Router) { }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      // wait for response
      this.loading = true;
      this.recipeService.get(id).subscribe({
        next: data => {
          this.recipe = data;
          this.loading = false;
        },
        error: error => {
          console.error('There was an error!', error.message);
          this.loading = false;
          alert(error.message);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  delete() {
    if (confirm("Are you sure you want to delete this recipe?")) {
      // wait for response
      this.loading = true;
      this.recipeService.delete(this.recipe.id).subscribe({
        next: data => {
          this.loading = false;
          this.router.navigate(['/search']);
        },
        error: error => {
          console.error('There was an error!', error.message);
          this.loading = false;
          alert(error.message);
        }
      });
    }
  }
}
