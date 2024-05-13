import { Global, Module } from '@nestjs/common';
import { CurrentUserProvider } from './current.user.provider';

@Global()
@Module({
    providers: [CurrentUserProvider],
    exports: [CurrentUserProvider]
})
export class CommonModule {}
