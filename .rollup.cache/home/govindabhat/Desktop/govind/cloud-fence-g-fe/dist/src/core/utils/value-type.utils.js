export const isPrimitive = (value) => value === null || (typeof value != 'object' && typeof value != 'function');
export const isIterable = (value) => !!value &&
    typeof value !== 'string' &&
    (Array.isArray(value) || typeof value?.[Symbol.iterator] === 'function');
export const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
export const isString = (value) => typeof value === 'string';
//# sourceMappingURL=value-type.utils.js.map