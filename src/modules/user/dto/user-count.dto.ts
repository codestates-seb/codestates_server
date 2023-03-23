import { Property } from 'kyoongdev-nestjs';
export class UserCountDTO {
  @Property({ apiProperty: { type: 'number' } })
  count: number;

  constructor(count: number) {
    this.count = count;
  }
}
