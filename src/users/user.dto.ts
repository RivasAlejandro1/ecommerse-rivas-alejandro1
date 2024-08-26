import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches, Validate, ValidateIf, isDefined, isNotEmpty, isString } from "class-validator";
import { MatchPassword } from "src/decorators/matchPasswords.decorators";
import { Role } from "src/roles.enum";


export class CreateUserDto   {

    @ApiProperty({example: "Blacky"})
    @IsNotEmpty()	
    @IsString()
    @Length(3, 80)
    name: string;

    @ApiProperty({example: "pedro123@example.com"})
    @IsEmail()
    email: string;
    
    
    @ApiProperty({example: "Al123*perro"})
    //R
    @Matches(/[a-z]/, {message: "the password must have a lowercase letter"})
    @Matches(/[A-Z]/, {message: "the password must have a uppercase letter"})
    @Matches(/[0-9]/, {message: "the password must have a number"})
    @Matches(/[!@#$%^&*]/, {message: "the password must have one of the following characters:!@#$%^&*"})
    @Length(8,15)
    @IsNotEmpty()
    password: string;

       
    @Matches(/[a-z]/, {message: "the password must have a lowercase letter"})
    @Matches(/[A-Z]/, {message: "the password must have a uppercase letter"})
    @Matches(/[0-9]/, {message: "the password must have a number"})
    @Matches(/[!@#$%^&*]/, {message: "the password must have one of the following characters:!@#$%^&*"})
    @Length(8,15)
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmationPassword: string;

    @Length(3,80)
    address: string;
    
    @IsNotEmpty()
    @IsNumber()
    phone: number;
    
    @IsString()
    @Length(5, 20)
    country: string;
    

    @IsString()
    @Length(5, 20)
    city: string;

    @IsEmpty()
    isAdmin?: Role;

}

export class LoginUserDto extends PickType(CreateUserDto, ["email", "password"]){}


