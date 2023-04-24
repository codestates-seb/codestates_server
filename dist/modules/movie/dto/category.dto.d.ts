import { Category } from '@prisma/client';
export interface CategoryDTOProps {
    movieId?: string;
    categoryId: string;
    category: Category;
}
export declare class CategoryDTO {
    id: string;
    name: string;
    constructor(props: CategoryDTOProps);
}
