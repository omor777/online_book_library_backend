
interface Default {
    totalItems: number;
    limit: number;
    page: number;
    sortBy: string;
    sortType: string;
    search: string;
}

const defaults: Default = {
    totalItems: 0,
    limit: 10,
    page: 1,
    sortBy: 'updatedAt',
    sortType: 'dsc',
    search: '',
}

export default defaults;    