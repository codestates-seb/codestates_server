import { Actor } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

export interface ActorDTOProps {
  movieId: string;
  actorId: string;
  actor: Actor;
}

export class ActorDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  name: string;

  constructor(props: ActorDTOProps) {
    this.id = props.actorId;
    this.name = props.actor.name;
  }
}
