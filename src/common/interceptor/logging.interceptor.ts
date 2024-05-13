import { Request } from 'express';
import { NestInterceptor, ExecutionContext, CallHandler,
    Injectable, Logger } from '@nestjs/common';

import { catchError, Observable, tap, throwError } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';

@Injectable()
export default class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: Logger) { }
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {

        const now = Date.now();
        const formattedTime = dayjs(now).format('YYYY-MM-DD HH:mm:ss');
        const id = `{${uuidv4()}_${now}}`;

        const request: Request = context.switchToHttp().getRequest();
        const { originalUrl, method } = request;

        this.logger.log(`[${formattedTime}]: THE ${id} REQUEST HAS STARTED [${method}] ${originalUrl ? originalUrl : ''}`);

        return handler.handle().pipe(
            tap(() => {
                const { statusCode } = context.switchToHttp().getResponse();
                const delay = Date.now() - now;
                this.logger.log(`THE ${id} REQUEST HAS ENDEED | ${statusCode} | [${method}] ${originalUrl ? originalUrl : ''} - ${delay}ms`);
            }),

            catchError((error) => {
                const delay = Date.now() - now;
                this.logger.error(`[${formattedTime}]: [${context.getClass()?.name}]:[${context.getHandler()?.name}] THE ${id} REQUEST HAS ENDEED With Error [${method}] ${originalUrl} - ${delay}ms [${JSON.stringify(error)}]`);
                return throwError(() => error);
            }),
        );
    }
}
