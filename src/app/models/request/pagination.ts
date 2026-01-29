export class PagingSortingParameters {
    pageSize: number;
    pageIndex: number;
    sortBy: string;
    sortDirection: 'asc' | 'desc';
    search: string;

    constructor(
        pageSize: number,
        pageIndex: number,
        sortBy: string,
        sortDirection: 'asc' | 'desc',
        search: string = ''
    ) {
        this.pageSize = pageSize;
        this.pageIndex = pageIndex;
        this.sortBy = sortBy;
        this.sortDirection = sortDirection;
        this.search = search;
    }
}