import { FAQ } from '@prisma/client';
interface UpdateFaqDTOProps extends Partial<FAQ> {
}
export declare class UpdateFaqDTO {
    title?: string;
    content?: string;
    constructor(props?: UpdateFaqDTOProps);
}
export {};
