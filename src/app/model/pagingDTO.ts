import { Recipe } from "./recipe";

export class PagingDTO {

    constructor(public total: number, public recipes: Recipe[] = []) {
    }
}