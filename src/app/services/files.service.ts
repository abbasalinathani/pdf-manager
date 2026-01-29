import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ServerUrls } from "../shared/constants";
import { PagingSortingParameters } from "../models/request/pagination";
import { Observable } from "rxjs";
import { FileResponseDto } from "../models/response/file";
import { FilesFilterRequestDto } from "../models/request/files";

@Injectable({
    providedIn: 'root'
})
export class FilesService {
    private httpClient = inject(HttpClient);

    public getFiles(request: FilesFilterRequestDto | null): Observable<FileResponseDto[]> {
        // TODO: add pagination and sorting to the url
        const params = this.setGetFilesHttpParams(request);
        return this.httpClient.get<FileResponseDto[]>(ServerUrls.FILES, { params });
    }

    private setGetFilesHttpParams(request: FilesFilterRequestDto | null): HttpParams {
        let params = new HttpParams();
        if (request) {
            params = params.append('take', request?.pageSize ?? 'asc');
            params = params.append('skip', ((request?.pageIndex ?? 1) * (request?.pageSize ?? 10)).toString() ?? '0');
            if (request?.sortBy) {
                params = params.append('sortBy', request.sortBy);
                params = params.append('orderBy', request.sortDirection);
            }
            if (request?.authorId) {
                params = params.append('authorId', request.authorId);
            }
            if (request?.search) {
                params = params.append('search', request.search);
            }
        }
        return params;
    }
    public getFilesCount(): Observable<number> {
        return this.httpClient.get<number>(ServerUrls.FILES_COUNT);
    }
}