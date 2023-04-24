import { CreateStaffDTO } from './create-staff.dto';
export declare class UpdateMovieDTO {
    title?: string;
    plot?: string;
    releasedAt?: string;
    rating?: string;
    runtime?: string;
    company?: string;
    genres?: string[];
    staffs?: CreateStaffDTO[];
    actors?: string[];
}
