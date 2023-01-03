import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { RecipeComponent } from './recipe/recipe.component';
import { EditComponent } from './edit/edit.component';
import { AuthComponent } from './auth/auth.component';
import { PicturesComponent } from './pictures/pictures.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'pictures', component: PicturesComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/tag/:tag', component: SearchComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'add', component: EditComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'login', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
