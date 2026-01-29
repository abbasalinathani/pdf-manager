import {
    type ColumnDef
} from '@tanstack/angular-table';
import { FileGridItem } from '../../../models/view-models/file';

export class FilesHelper {
    public static getFileColumns(): ColumnDef<FileGridItem>[] {
        return [
            {
                accessorKey: 'title',
                header: 'Title',
                enableSorting: true,
            },
            {
                accessorKey: 'description',
                header: 'Description',
                enableSorting: true
            },

        ]
    }
}