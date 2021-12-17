import {
  IsOptional,
  MaxLength
} from 'class-validator';

export class UpdateInventoryDto {

    @IsOptional()
    @MaxLength(200, {
      message: 'O atributo name deve ter menos de 200 caracteres',
    })
    name?: string;

    @IsOptional()
    mainInventory?: boolean;

    @IsOptional()
    active?: boolean;
  }