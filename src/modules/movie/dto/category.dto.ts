import { Category } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

interface CategoryDTOProps extends Category {}
export class CategoryDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  name: string;

  constructor(props: CategoryDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
