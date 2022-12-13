import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../service/recipe.service.mock';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags!: string[];
  base64Codes: Array<string> = [];
  name!: string;
  body!: string;
  result!: string;
  private id!: string;
  private sub: any;
  recipe!: Recipe;

  @ViewChild('tagsInput') tagsInput!: ElementRef<HTMLTextAreaElement> | null;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
    this.allTags = recipeService.getAllTags();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.id = params['id'];
        this.recipe = this.recipeService.get(this.id);
        this.name = this.recipe.name;
        this.body = this.recipe.body;
        this.tags = this.recipe.tags;
        this.base64Codes = this.recipe.images;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our tag
    if (value) {
      this.tags.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const tag = event.option.viewValue;
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
    this.tagsInput!.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.trim().toLowerCase();
    return this.allTags.filter(tag => tag.includes(filterValue)).filter(tag => this.tags.includes(tag));
  }

  create() {
    const newRecipe = this.recipeService.create(this.name, this.body, this.tags, this.base64Codes);
    if (newRecipe == null || newRecipe == undefined) {
      this.result = "Failure!";
    } else {
      this.result = "Success!";
    }
    this.name = "";
    this.body = "";
    this.tags = [];
    this.base64Codes = [];
  }

  files: Array<File> = [];

  onFilechange(event: any) {
    this.files = event.target.files;
  }

  upload() {
    if (this.files.length > 0) {
      const base64Images: Array<string> = [];
      for (const file of this.files) {
        const observable = new Observable((subscriber: Subscriber<any>) => {
          this.readFile(file, subscriber);
        })
        observable.subscribe((data) => {
          this.base64Codes.push(data)
        })
      }
    } else {
      alert("Please select a file first.")
    }
  }

  private readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    }
  }

  clearImages() {
    this.base64Codes = [];
  }

  update() {
    const updated: Recipe = this.recipeService.update(this.recipe.id, this.name, this.body,
      this.tags, this.base64Codes);
    if (updated != null && updated != undefined) {
      this.result = "Success!"
    } else {
      this.result = "Failure!";
    }
    this.router.navigate(['/recipe/' + this.id]);
  }
}
