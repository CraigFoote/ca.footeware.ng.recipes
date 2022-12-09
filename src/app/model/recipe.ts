export class Recipe {

    constructor(public id: string, public name: string, public body: string, public tags: string[], public images: string[] = []) {
    }
}