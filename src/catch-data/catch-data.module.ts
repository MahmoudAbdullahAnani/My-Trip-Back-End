import { Module } from '@nestjs/common';
import { CatchDataController } from './controllers/catch-data.controller';
import { CatchDataService } from './services/catch-data.service';
import { CatchDataConnectionProvider } from './providers/databaseConnection.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CatchDataController],
  providers: [...CatchDataConnectionProvider, CatchDataService],
})
export class CatchDataModule {}
