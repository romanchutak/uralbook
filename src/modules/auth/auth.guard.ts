import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { UserService } from '../user/service';
import { CurrentUserProvider } from '../common/current.user.provider';

import { UserModel } from '../user/model';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private currentUserProvider: CurrentUserProvider,
        private userService: UserService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        return this.userService.read(1).then(user => {
            if (user instanceof UserModel) {
                this.currentUserProvider.setUser(user);

                return true;
            }
        }, () => false);
    }
}
