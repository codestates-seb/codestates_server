import { Staff } from '@prisma/client';
export interface StaffDTOProps {
    movieId: string;
    staffId: string;
    staff: Staff;
}
export declare class StaffDTO {
    id: string;
    name: string;
    role: string;
    constructor(props: StaffDTOProps);
}
