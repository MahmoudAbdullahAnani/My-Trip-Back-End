import { PartialType } from '@nestjs/mapped-types';
import { createPopularDestinationsDto } from './staticSections.dto';

export class updatePopularDestinationsDto extends PartialType(
  createPopularDestinationsDto,
) {}
