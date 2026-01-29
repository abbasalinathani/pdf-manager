import { PagingSortingParameters } from "./pagination";

export class FilesFilterRequestDto extends PagingSortingParameters {
    authorId: string;

    constructor(
        pageSize: number,
        pageIndex: number,
        sortBy: string,
        sortDirection: 'asc' | 'desc',
        search: string,
        authorId: string
    ) {
        super(pageSize, pageIndex, sortBy, sortDirection, search);
        this.authorId = authorId;
    }
}