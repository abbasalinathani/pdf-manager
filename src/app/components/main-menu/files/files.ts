import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmTableImports } from '../../../../../libs/ui/table/src';
import { createAngularTable, getCoreRowModel, getSortedRowModel, PaginationState, SortingState } from '@tanstack/angular-table';
import { FileGridItem } from '../../../models/view-models/file';
import { FilesService } from '../../../services/files.service';
import { FilesHelper } from './files-helper';
import { debounceTime, distinctUntilChanged, forkJoin, Subject } from 'rxjs';
import { PagingSortingParameters } from '../../../models/request/pagination';
import { FilesFilterRequestDto } from '../../../models/request/files';

@Component({
  selector: 'app-files',
  imports: [HlmTableImports, HlmInputImports],
  templateUrl: './files.html',
  styleUrl: './files.scss',
})
export class Files implements OnInit {

  public globalFilter = signal<string>('');
  public _columns = FilesHelper.getFileColumns();
  public search$ = new Subject<string>();

  private filesService = inject(FilesService);
  private files = signal<FileGridItem[]>([]);
  private totalRows = signal(0);
  private pagination = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  private sorting = signal<SortingState>([{ id: 'createdAt', desc: true }]);

  protected readonly table = createAngularTable<FileGridItem>(() => ({
    data: this.files(),
    columns: this._columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    rowCount: this.totalRows(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination: this.pagination(),
      sorting: this.sorting(),
      globalFilter: this.globalFilter()
    },
    onPaginationChange: updater => {
      this.pagination.update(old =>
        typeof updater === 'function' ? updater(old) : updater
      );
    },

    onSortingChange: updater => {
      this.sorting.update(old =>
        typeof updater === 'function' ? updater(old) : updater
      );
    },
    onGlobalFilterChange: updater => {
      this.globalFilter.update(old =>
        typeof updater === 'function' ? updater(old) : updater
      );
    },
  }));

  constructor() {
    effect(() => {
      this.fetchFiles();
    });
  }

  ngOnInit(): void {
    this.search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.table.setGlobalFilter(value);
      });
  }

  private fetchFiles() {
    const { pageIndex, pageSize } = this.pagination();
    const sorting = this.sorting();
    const search = this.globalFilter();

    const params = new FilesFilterRequestDto(pageSize, pageIndex, sorting[0]?.id, sorting[0]?.desc ? 'desc' : 'asc', search, '');

    return forkJoin({
      files: this.filesService.getFiles(params),
      count: this.filesService.getFilesCount()
    }).subscribe({
      next: ({ files, count }) => {
        this.totalRows.set(count);
        this.files.set(files.map(file => new FileGridItem(file.id, file.title, file.description, file.rating, file.readPage, file.totalPages, file.createdAt, file.publishedOn)));
      }
    });
  }
}
