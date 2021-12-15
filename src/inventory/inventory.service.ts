import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryRepository } from './inventory.repository';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(InventoryRepository)
        private inventoryRepository: InventoryRepository,
    ) {}
}
