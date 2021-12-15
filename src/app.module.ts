import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), InventoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
