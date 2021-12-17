import { BaseQueryParametersDto } from "src/shared/dto/base-query-parameters.dto";

export class FindInventoriesQueryDto extends BaseQueryParametersDto {
    name: string;
    mainInventory: boolean;
    active: boolean;
    adminId: number;
}