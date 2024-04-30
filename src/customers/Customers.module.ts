import { Module } from '@nestjs/common';
import { CustomersService } from './Customers.service';
import { CustomersController } from './Customers.controller';
import { customersConnectionProvider } from './providers/databaseConnection.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController],
  providers: [...customersConnectionProvider, CustomersService],
})
export class CustomersModule {}
