import { Actor } from '@prisma/client';
export interface ActorDTOProps {
    movieId: string;
    actorId: string;
    actor: Actor;
}
export declare class ActorDTO {
    id: string;
    name: string;
    constructor(props: ActorDTOProps);
}
