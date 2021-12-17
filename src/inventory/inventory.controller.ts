import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { FindInventoriesQueryDto } from './dto/find-inventories-query.dto';
import { ReturnInventoryDto } from './dto/return-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryService } from './inventory.service';

// TODO: INSERIR CONTROLE DE ACESSO
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

  @Get(':id')
  async findInventoryById(@Param('id') id): Promise<ReturnInventoryDto> {
    const inventory = await this.inventoryService.findInventoryById(id);
    return {
        inventory,
        message: 'Inventário encontrado',
    };
  }
  
  @Patch(':id')
  async updateInventory(
    @Body(ValidationPipe) updateInventoryDto: UpdateInventoryDto,
    @Param('id') id: string,
  ) {
        return this.inventoryService.updateInventory(updateInventoryDto, id);
  }

  @Get()
  async findUsers(@Query() query: FindInventoriesQueryDto) {
    const found = await this.inventoryService.findInventories(query);
    return {
      found,
      message: 'Inventários encontrados',
    };
  }

}
