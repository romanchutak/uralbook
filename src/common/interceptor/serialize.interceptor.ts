import {
    ExecutionContext,
    NestInterceptor,
    CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Model } from 'sequelize-typescript';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export class SerializeInterceptor<T, K extends Model> implements NestInterceptor {
    constructor(private dto: ClassConstructor<T>) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<T|T[]> {
        return next.handle().pipe(
            map((data: K) => {
                if (Array.isArray(data)) {
                    return data.map(item => plainToInstance(this.dto, item, { enableCircularCheck: true }));
                }
                return plainToInstance(this.dto, data, { enableCircularCheck: true });
            }),
        );
    }
}
