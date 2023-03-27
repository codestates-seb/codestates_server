import { Category } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';

export interface CategoryDTOProps {
  movieId?: string;
  categoryId: string;
  category: Category;
}
export class CategoryDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  name: string;

  constructor(props: CategoryDTOProps) {
    this.id = props.categoryId;
    this.name = props.category.name;
  }
}
