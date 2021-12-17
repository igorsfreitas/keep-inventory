import {
  IsNotEmpty,
  MaxLength
} from 'class-validator';

export class CreateInventoryDto {
    @IsNotEmpty({
      message: 'Informe um adminId para este inventário',
    })
    adminId: number;

    @IsNotEmpty({
      message: 'Informe um name para este inventário',
    })
    @MaxLength(200, {
      message: 'O atributo name deve ter menos de 200 caracteres',
    })
    name: string;

    mainInventory?: boolean;
  }