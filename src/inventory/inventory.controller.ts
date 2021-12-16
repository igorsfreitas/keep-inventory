import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { ReturnInventoryDto } from './dto/return-inventory.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Post()
  async createInventory(
    @Body(ValidationPipe) createInventoryDto: CreateInventoryDto,
  ): Promise<ReturnInventoryDto> {
    const inventory = await this.inventoryService.createInventory(createInventoryDto);
    return {
        inventory,
        message: 'Inventário cadastrado com sucesso',
    };
  }

}
