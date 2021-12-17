import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { FindInventoriesQueryDto } from './dto/find-inventories-query.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
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

    async findInventoryById(inventoryId: string): Promise<Inventory> {
        const inventory = await this.inventoryRepository.findOne(inventoryId, {
            select: ['id', 'name', 'admin_id', 'mainInventory', 'active']
        });
    
        if (!inventory) throw new NotFoundException('Inventário não encontrado');
    
        return inventory;
    }

    async updateInventory(updateUserDto: UpdateInventoryDto, inventoryId: string): Promise<Inventory> {
      const inventory = await this.findInventoryById(inventoryId);
      const { name, active, mainInventory } = updateUserDto;
      inventory.name = name ? name : inventory.name;
      inventory.active = active ? active : inventory.active;
      inventory.mainInventory = mainInventory ? mainInventory : inventory.mainInventory;
      try {
        await inventory.save();
        return inventory;
      } catch (error) {
        throw new InternalServerErrorException(
          'Erro ao salvar os dados no banco de dados',
        );
      }
    }


    async findInventories(
      queryDto: FindInventoriesQueryDto,
    ): Promise<{ inventories: Inventory[]; total: number }> {
      const inventories = await this.inventoryRepository.findInventories(queryDto);
      return inventories;
    }

}
