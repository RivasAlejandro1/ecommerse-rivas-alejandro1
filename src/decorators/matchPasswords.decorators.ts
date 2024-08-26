import { BadRequestException } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
    //? definimos nombre de validación y no es async

export class MatchPassword implements ValidatorConstraintInterface {
    //? Compara password con password de confirmación
    validate(password: string, args: ValidationArguments) {
        
    if (password !== (args.object as any) [args.constraints[0]]) throw new BadRequestException("The passwords do not match");
    return true;
    }
}