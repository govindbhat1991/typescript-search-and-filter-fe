import { Primitive } from '../interfaces/generic.interface';

export const isPrimitive = (value: unknown): value is Primitive =>
    value === null || (typeof value != 'object' && typeof value != 'function');

export const isIterable = (value: unknown): boolean =>
    !!value &&
    typeof value !== 'string' &&
    (Array.isArray(value) || typeof (value as any)?.[Symbol.iterator] === 'function');

export const isObject = (value: unknown): boolean =>
    value !== null && typeof value === 'object' && !Array.isArray(value);

export const isString = (value: unknown) => typeof value === 'string';
