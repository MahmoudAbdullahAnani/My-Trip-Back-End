import { Module } from '@nestjs/common';
import { StaticSectionsService } from './PopularDestinationsDto/services/static-sections.service';
import { StaticSectionsController } from './PopularDestinationsDto/controllers/static-sections.controller';
import { staticSectionsConnectionProvider } from './providers/databaseConnection.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UploadService } from 'src/upload/services/upload.service';
import { userConnectionProvider } from 'src/users/providers/databaseConnection.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [StaticSectionsController],
  providers: [
    ...staticSectionsConnectionProvider,
    ...userConnectionProvider,
    StaticSectionsService,
    UploadService,
  ],
})
export class StaticSectionsModule {}
