import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';

@Module({
    imports: [TypeOrmModule.forFeature([InventoryRepository])],
    providers: [InventoryService],
})
export class InventoryModule {}
