import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from "../model/recipe";

@Injectable({
    providedIn: "root",
})
export class RecipeService {
    constructor(private http: HttpClient) { }

    loading: boolean = false;

    getAllTags(): Observable<any> {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        return this.http.get<any>('http://localhost:8060/recipes/tags', { headers });
    }

    getAllByPage(pageIndex: number, pageSize: number): Observable<any> {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        return this.http.get<any>('http://localhost:8060/recipes?pageNumber=' + pageIndex + '&pageSize=' + pageSize, { headers });
    }

    searchTagsByPage(tag: string, pageIndex: number, pageSize: number): Observable<any> {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        return this.http.get<any>('http://localhost:8060/recipes/search/tags?tag=' + tag + '&pageNumber=' + pageIndex + '&pageSize=' + pageSize, { headers });
    }

    searchAllByPage(term: string, pageNumber: number, pageSize: number): Observable<any> {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        return this.http.get<any>('http://localhost:8060/recipes/search?term='+term+'&pageNumber=' + pageNumber + '&pageSize=' + pageSize, { headers });
    }

    get(id: string): Observable<any> {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        return this.http.get<any>('http://localhost:8060/recipes/' + id, { headers });
    }

    create(name: string, body: string, tags: string[], images: string[]): Observable<any> {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        const recipeJson = { "name": name, "body": body, "tags": tags, "images": images };
        return this.http.post<any>('http://localhost:8060/recipes', recipeJson, { headers });
    }

    delete(id: string) {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        return this.http.delete<any>('http://localhost:8060/recipes/' + id, { headers });
    }

    update(id: string, name: string, body: string, tags: string[], images: string[]): Observable<any> {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        const recipeJson = { "name": name, "body": body, "tags": tags, "images": images };
        return this.http.post<any>('http://localhost:8060/recipes/' + id, recipeJson, { headers });
    }
}