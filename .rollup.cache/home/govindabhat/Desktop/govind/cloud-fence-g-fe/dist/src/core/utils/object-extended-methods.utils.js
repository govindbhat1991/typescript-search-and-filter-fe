/** can get difference between two object */
export const objectDifference = (source, target) => {
    return Object.fromEntries(Object.entries(target).filter(([targetKey, targetValue]) => Object.entries(source).every(([sourceKey, sourceValue]) => sourceKey !== targetKey || (sourceKey === targetKey && sourceValue !== targetValue))));
};
//# sourceMappingURL=object-extended-methods.utils.js.map