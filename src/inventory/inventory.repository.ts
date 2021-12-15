import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Inventory } from './inventory.entity';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {
    async createInventory(
        createInventoryDto: CreateInventoryDto
      ): Promise<Inventory> {
        const { mainInventory, name, adminId } = createInventoryDto;
    
        const inventory = this.create();
        inventory.admin_id = adminId;
        inventory.name = name;
        inventory.mainInventory = mainInventory;

        try {
          await inventory.save();
          return inventory;
        } catch (error) {
          // Código de erro 23505, que segundo a documentação do PostgreSQL é o código de erro retornado
          if (error.code.toString() === '23505') {
            throw new ConflictException('Inventário já cadastrado para essa unidade');
          } else {
            throw new InternalServerErrorException(
              'Erro ao salvar o inventário no banco de dados',
            );
          }
        }
      }
}