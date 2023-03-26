import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('faqs')
@ApiTags('FAQ')
export class FaqController {}
