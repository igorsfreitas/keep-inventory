import { createParamDecorator } from '@nestjs/common';
import { Inventory } from 'src/inventory/inventory.entity';

export const GetInventory = createParamDecorator(
  (_data, req): Inventory => {
    const inventory = req.args[0].inventory;
    return inventory;
  },
);