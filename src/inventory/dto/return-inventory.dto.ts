import { Inventory } from '../inventory.entity';

export class ReturnInventoryDto {
  inventory: Inventory;
  message: string;
}