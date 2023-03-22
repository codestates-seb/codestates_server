import { ReportType, ReviewReport, User } from '@prisma/client';
import { Property } from 'kyoongdev-nestjs';
import { UserDTO } from 'modules/user/dto';

interface ReportsDTOProps extends Partial<ReviewReport> {
  user: Partial<User>;
}

export class ReportsDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  contents: string;

  @Property({ apiProperty: { type: 'string' } })
  reason: string;

  @Property({ apiProperty: { type: 'string', enum: Object.keys(ReportType) } })
  type: ReportType;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '처리일자' } })
  processedAt: Date;

  @Property({ apiProperty: { type: UserDTO } })
  user: UserDTO;

  constructor(props: ReportsDTOProps) {
    this.id = props.id;
    this.contents = props.contents;
    this.reason = props.reason;
    this.type = props.type;
    this.processedAt = props.processedAt;
    this.user = new UserDTO(props.user);
  }
}
