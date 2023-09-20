import { Genre } from "./Genre";

export class BookModel {

    id: number;
    title: string;
    author: string;
    description: string;
    copies: number;
    copiesAvailable: number;
    genres: Genre[];
    img: string;

    constructor ( id: number, title: string, author: string, description: string, copies: number, copiesAvailable: number, genres: Genre[], img: string) {

        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.copiesAvailable = copiesAvailable;
        this.genres = genres;
        this.img = img;
    }
    
}