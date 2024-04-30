import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './CreateCustomerDto.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
