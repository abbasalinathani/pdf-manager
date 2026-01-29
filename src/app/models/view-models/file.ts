export class FileGridItem {
    id: string;
    title: string;
    description: string;
    rating: number;
    readPage: number;
    totalPages: number;
    createdAt: Date;
    publishedAt: Date;

    constructor(
        id: string,
        title: string,
        description: string,
        rating: number,
        readPage: number,
        totalPages: number,
        createdAt: Date,
        publishedAt: Date
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.readPage = readPage;
        this.totalPages = totalPages;
        this.createdAt = createdAt;
        this.publishedAt = publishedAt;
    }
}