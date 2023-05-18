import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): any;
}

export function Serialize(dto?: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private dto?: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        let exposedData = data;
        if (this.dto) {
          exposedData = plainToClass(this.dto, data, {
            excludeExtraneousValues: true,
          });
        }
        return {
          success: false,
          payload: exposedData,
        };
      }),
    );
  }
}
