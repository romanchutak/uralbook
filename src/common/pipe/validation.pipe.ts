import {
    Injectable,
    ArgumentMetadata,
    ValidationPipeOptions,
} from '@nestjs/common';

import { validate } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationException } from '../exception/ValidationException';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {

    constructor(options?: ValidationPipeOptions) {
        super(options);
    }

    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const { metatype } = metadata;

        if (!metatype || !this.toValidate(metadata)) {
            return value;
        }

        const object = plainToClass(metatype, value);

        const errors = await validate(object, this.validatorOptions);

        if (errors.length > 0) {
            throw new ValidationException(this.formatErrors(errors));
        }

        return value;
    }

    protected toValidate(metadata: ArgumentMetadata): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find(type => metadata.metatype === type);
    }

    private formatErrors(erorrs: any[]) {
        return erorrs.map(error => {
            for (const key in error.constraints) {
                return {
                    'path': error.property,
                    'message': error.constraints[key]
                };
            }
        });
    }
}
