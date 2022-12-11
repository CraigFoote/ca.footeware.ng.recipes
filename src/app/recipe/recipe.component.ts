import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../service/recipe.service.mock';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit, OnDestroy {
  private id!: string;
  recipe!: Recipe;
  private sub: any;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private ngZone: NgZone) { }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.recipe = this.recipeService.get(this.id);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
