import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class loginDTO {

    @MaxLength(15)
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    login: string;

    @MaxLength(15)
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    password: string;
}