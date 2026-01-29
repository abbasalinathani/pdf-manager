export class FileResponseDto {
    id: string;
    title: string;
    description: string;
    publishedOn: Date;
    rating: number;
    readPage: number;
    totalPages: number;
    createdAt: Date;
    updatedAt: Date;
    //TODO: add other properties

    constructor(id: string, title: string, description: string, publishedOn: Date, rating: number, readPage: number, totalPages: number, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.publishedOn = publishedOn;
        this.rating = rating;
        this.readPage = readPage;
        this.totalPages = totalPages;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}