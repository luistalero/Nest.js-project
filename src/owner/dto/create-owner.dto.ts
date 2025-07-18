import { IsInt, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateOwnerDto {

    @IsString()
    @MinLength(1)
    firstName: string;

    @IsString()
    @MinLength(1)
    lastName: string;

    @IsString()
    @MinLength(1)
    email: string;

    @IsInt()
    @IsPositive()
    @MaxLength(10)
    phone: number;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    address?: string;

}
