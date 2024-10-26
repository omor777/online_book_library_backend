
interface IConfig {
    totalItems: number;
    limit: number;
    page: number;
    sortBy: string;
    sortType: string;
    search: string;
}

const config: IConfig = {
    totalItems: 0,
    limit: 10,
    page: 1,
    sortBy: 'updatedAt',
    sortType: 'dsc',
    search: '',
}

export default config;