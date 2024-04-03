import { Controller, Get } from '@nestjs/common';
import { SubService } from '../services/sub.service';

@Controller('sub')
export class SubController {
  constructor(private readonly subService: SubService) {}

  @Get()
  getSub() {
    return 'sub';
  }
}
