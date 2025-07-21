import { Type } from "class-transformer";
import { IsInt, IsPositive, IsDate, IsNotEmpty } from "class-validator";

export class CreateAdoptionDto {

    @IsInt()
    @IsPositive()
    catId: number;

    @IsInt()
    @IsPositive()
    ownerId: number;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    adoptionDate: Date;

}
