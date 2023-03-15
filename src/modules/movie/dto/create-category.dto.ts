import { Property } from 'kyoongdev-nestjs';

export class CreateCategoryDTO {
  @Property({ apiProperty: { type: 'string' } })
  name: string;
}
