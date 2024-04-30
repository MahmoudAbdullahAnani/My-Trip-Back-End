import { Module } from '@nestjs/common';
import { OffersHotelsService } from './offers-hotels.service';
import { OffersHotelsController } from './offers-hotels.controller';
import { offersHotelsConnectionProvider } from './providers/databaseConnection.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OffersHotelsController],
  providers: [...offersHotelsConnectionProvider, OffersHotelsService],
})
export class OffersHotelsModule {}
