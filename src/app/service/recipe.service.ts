import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root",
})
export class RecipeService {
    constructor(private http: HttpClient) { }

    private host: string = 'http://localhost:9000/recipes'

    getAllTags(): Observable<any> {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        return this.http.get<any>(this.host + '/tags', { headers });
    }

    getAllByPage(pageIndex: number, pageSize: number): Observable<any> {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        return this.http.get<any>(this.host + '?pageNumber=' + pageIndex + '&pageSize=' + pageSize, { headers });
    }

    searchTagsByPage(tag: string, pageIndex: number, pageSize: number): Observable<any> {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        return this.http.get<any>(this.host + '/search/tags?tag=' + tag + '&pageNumber=' + pageIndex + '&pageSize=' + pageSize, { headers });
    }

    searchAllByPage(term: string, pageNumber: number, pageSize: number): Observable<any> {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        return this.http.get<any>(this.host + '/search?term=' + term + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize, { headers });
    }

    get(id: string): Observable<any> {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        return this.http.get<any>(this.host + '/' + id, { headers });
    }

    create(name: string, body: string, tags: string[], images: string[]): Observable<any> {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        const recipeJson = { "name": name, "body": body, "tags": tags, "images": images };
        return this.http.post<any>(this.host, recipeJson, { headers });
    }

    delete(id: string) {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        return this.http.delete<any>(this.host + '/' + id, { headers });
    }

    update(id: string, name: string, body: string, tags: string[], images: string[]): Observable<any> {
        const headers = { 'Authorization': 'Basic Y3JhaWc6Y2hvY29sYXRl', 'Access-Control-Allow-Origin': '*' };
        const recipeJson = { "name": name, "body": body, "tags": tags, "images": images };
        return this.http.post<any>(this.host + '/' + id, recipeJson, { headers });
    }
}