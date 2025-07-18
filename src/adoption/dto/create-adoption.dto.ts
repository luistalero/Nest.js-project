import { IsInt, IsPositive, IsDate } from "class-validator";

export class CreateAdoptionDto {

    @IsInt()
    @IsPositive()
    catId: number;

    @IsInt()
    @IsPositive()
    ownerId: number;

    @IsDate()
    adoptionDate: Date;

}
