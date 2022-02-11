export interface PaginationParams {
    limit : number;
    page : number;

    [key:string]:any
}

export interface ListResponse<T> {
    data : T[];
    pagination?: PaginationParams
}

export interface ListParams {
    page: number;
    limit: number;
    sort?: number;
    order?: 'asc' | 'desc';

    [key:string]:any
}