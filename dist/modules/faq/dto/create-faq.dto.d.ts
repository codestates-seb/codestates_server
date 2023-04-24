import { FAQ } from '@prisma/client';
interface CreateFaqDTOProps extends Partial<FAQ> {
}
export declare class CreateFaqDTO {
    title: string;
    content: string;
    constructor(props?: CreateFaqDTOProps);
}
export {};
