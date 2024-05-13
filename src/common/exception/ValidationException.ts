import { ValidationErrorItem } from 'sequelize';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ValidationException extends HttpException {

    constructor(errors: Record<string, any> | any) {
        super({ success: false, errors: ValidationException.formatErrors(errors) }, HttpStatus.OK);
    }

    private errors = [];

    private static formatErrors(errors: any[]) {
        return errors.map((error: ValidationErrorItem) => {
            return {
                'field': error.path,
                'message': error.message
            };
        });
    }

    getErrors(): any[] {
        return this.getResponse()['errors'];
    }
}
