import { Module } from '@nestjs/common';
import { AirportSearchController } from './airport-search.controller';

@Module({
  controllers: [AirportSearchController],
  providers: [],
})
export class AirportSearchModule {}
