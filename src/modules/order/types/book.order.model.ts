export type TBookOrderCA = {
    orderId: number;
    bookId: number;
};

export type TBookOrder = TBookOrderCA & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
