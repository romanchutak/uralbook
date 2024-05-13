export type TUserCA = {
    role: string;
    fullname: string;
}

export type TUser = TUserCA & {
    id: number;
}
