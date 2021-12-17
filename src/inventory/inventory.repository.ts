import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { FindInventoriesQueryDto } from './dto/find-inventories-query.dto';
import { Inventory } from './inventory.entity';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {
    async findInventories(
      queryDto: FindInventoriesQueryDto,
    ): Promise<{ inventories: Inventory[]; total: number }> {
      queryDto.active = queryDto.active === undefined ? true : queryDto.active;
      queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
      queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

      const { adminId, name, mainInventory, active } = queryDto;
      const query = this.createQueryBuilder('inventory');
      query.where('inventory.active = :active', { active });

      if (adminId) {
        query.andWhere('inventory.admin_id ILIKE :adminId', { adminId: `%${adminId}%` });
      }

      if (name) {
        query.andWhere('inventory.name ILIKE :name', { name: `%${name}%` });
      }

      if (mainInventory) {
        query.andWhere('inventory.mainInventory = :mainInventory', { mainInventory });
      }
      query.skip((queryDto.page - 1) * queryDto.limit);
      query.take(+queryDto.limit);
      query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
      query.select(['inventory.name', 'inventory.email', 'inventory.role', 'inventory.status']);

      const [inventories, total] = await query.getManyAndCount();

      return { inventories, total };
    }
    
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