import {
    Catch,
    Logger,
    HttpStatus,
    Injectable,
    ArgumentsHost,
    HttpException,
    ExceptionFilter,
} from '@nestjs/common';
import { ValidationException } from './ValidationException';

@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(
        private readonly logger: Logger,
    ) {}

    catch(exception: any|unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        console.log('CATCHED EXCEPTION AllExceptionsFilter');
        console.log(typeof exception);
        console.log(exception);

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception instanceof ValidationException) {
            console.log('exception instanceof ValidationException');
            const res = exception.getResponse() as ValidationResponseInterface;
            const { errors } = res;

            response.status(status).json({
                ...exception.getResponse() as ValidationResponseInterface,
                errors
            });

            return;
        }

        if (exception instanceof Object) {
            if (
                exception.name?.localeCompare('SequelizeValidationError') === 0 ||
                exception.name?.localeCompare('SequelizeUniqueConstraintError') === 0
            ) {
                const validation = new ValidationException(exception.errors);

                response.status(200).json({
                    success: false,
                    errors: validation.getErrors()
                });

                return;
            }
        }

        this.logger.error(exception?.message, exception?.stack);

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception?.message
        });
    }
}

interface ValidationResponseInterface {
    success: boolean;
    errors: ValidationErrorItemPreOutput[]
}

type ValidationErrorItemPreOutput = {
    field: string;
    message: string;
}
