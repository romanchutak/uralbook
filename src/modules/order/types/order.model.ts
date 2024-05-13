export type TOrderCA = {
    userId: number;
};

export type TOrder = TOrderCA & {
    id: number;
    status: TStatus;
    createdAt: Date;
    updatedAt: Date;
}

export type TStatus = 'open' | 'closed';
