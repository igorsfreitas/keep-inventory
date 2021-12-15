import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Inventory } from './inventory.entity';
import { InventoryRepository } from './inventory.repository';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(InventoryRepository)
        private inventoryRepository: InventoryRepository,
    ) {}

    async createInventory(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
        return this.inventoryRepository.createInventory(createInventoryDto);
    }
}
