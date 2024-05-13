import { TransformFnParams } from 'class-transformer';

export const toBoolean = ({ value }: TransformFnParams): boolean => {
    return value === true || value === 1 || value === '1' || value === 'yes' || value === 'on';
};

export const toNumber = ({ value }: TransformFnParams): number => {
    return Number(`${value}`.trim().replaceAll(/\D/g, ''));
};

export const toNumberArray = ({ value }: TransformFnParams): number[] => {
    if (typeof value === 'number') {
        return [value];
    }
    if (Array.isArray(value)) {
        return value.filter(v => typeof Number(v) === 'number');
    }
    if (typeof value === 'string') {
        const arr = value.split(',');

        const numbers = arr.map(v => Number(v.trim()));

        return numbers.filter(v => typeof Number(v) === 'number');
    }

    return [];
};
