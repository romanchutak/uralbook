import { ValidationError } from 'class-validator';
import { ValidationException } from '../exception/ValidationException';

export const CustomValidationPipeExceptionFactory = (errors: ValidationError[]): ValidationException => {
    const re = errors.map(error => {
        for (const key in error.constraints) {
            return {
                'path': error.property,
                'message': error.constraints[key]
            };
        }
    });

    return new ValidationException(re);
};
