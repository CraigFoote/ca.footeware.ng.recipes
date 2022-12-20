import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../service/recipe.service';

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
  allTags: string[] = [];
  base64Codes: Array<string> = [];
  name!: string;
  body!: string;
  result!: string;
  private id!: string;
  private sub: any;
  recipe!: Recipe;
  loading: boolean = false;

  @ViewChild('tagsInput') tagsInput!: ElementRef<HTMLTextAreaElement> | null;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
    // respond to tag selection
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
  }

  ngOnInit(): void {
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
      }
    });
    // get the id of the selected recipe
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.id = params['id'];
        this.recipeService.get(this.id).subscribe({
          next: data => {
            this.recipe = data;
            this.name = this.recipe.name;
            this.body = this.recipe.body;
            this.tags = this.recipe.tags;
            this.base64Codes = this.recipe.images;
            this.loading = false;
          },
          error: error => {
            console.error('There was an error!', error.message);
            this.loading = false;
          }
        });
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
    if (this.name == undefined) {
      this.result = "Missing name."
    } else if (this.body == undefined) {
      this.result = "Missing body."
    } else if (this.tags.length == 0) {
      this.result = "Missing tags."
    } else {
      // wait for the response
      this.loading = true;
      this.recipeService.create(this.name, this.body, this.tags, this.base64Codes).subscribe({
        next: data => {
          if (data != undefined) {
            this.result = "Success!";
            this.name = "";
            this.body = "";
            this.tags = [];
            this.base64Codes = [];
            this.loading = false;
          };
        },
        error: error => {
          console.error('There was an error!', error.message);
          this.loading = false;
        }
      });
    }
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
    if (this.name == undefined || this.name.length == 0) {
      this.result = "Missing name."
    } else if (this.body == undefined || this.body.length == 0) {
      this.result = "Missing body."
    } else if (this.tags.length == 0 || this.tags.length == 0) {
      this.result = "Missing tags."
    } else {
      // wait for the response
      this.loading = true;
      this.recipeService.update(this.recipe.id, this.name, this.body, this.tags, this.base64Codes).subscribe({
        next: data => {
          if (data != undefined) {
            this.result = "Success!";
            this.name = "";
            this.body = "";
            this.tags = [];
            this.base64Codes = [];
            this.loading = false;
            this.router.navigate(['/recipe/' + this.id]);
          } else {
            this.result = "Failure!";
          }
        },
        error: error => {
          console.error('There was an error!', error.message);
          this.loading = false;
        }
      });
    }
  }
}
