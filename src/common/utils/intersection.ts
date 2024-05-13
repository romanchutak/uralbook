export const intersection = <T>(one: T[], two: T[]): T[] => {
    if (one.length > 0) {
        return one.filter(x => two.includes(x));
    }

    return two;
};
