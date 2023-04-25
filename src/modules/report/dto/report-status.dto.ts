import { Property } from 'kyoongdev-nestjs';

interface Props {
  completed: number;
  inProgress: number;
}

export class ReportStatusDTO {
  @Property({ apiProperty: { type: 'number' } })
  completed: number;

  @Property({ apiProperty: { type: 'number' } })
  inProgress: number;
  constructor(props: Props) {
    this.completed = props.completed;
    this.inProgress = props.inProgress;
  }
}
