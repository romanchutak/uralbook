import { UserModel } from '../user/model';

export class CurrentUserProvider {
    private user: UserModel;

    setUser(user: UserModel): void {
        this.user = user;
    }

    getUser(): UserModel|null {
        return this.user;
    }
}
