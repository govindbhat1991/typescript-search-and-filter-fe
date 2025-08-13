/** can get difference between two object */
export const objectDifference = (source: Record<string, unknown>, target: Record<string, unknown>) => {
    return Object.fromEntries(
        Object.entries(target).filter(([targetKey, targetValue]) =>
            Object.entries(source).every(
                ([sourceKey, sourceValue]) =>
                    sourceKey !== targetKey || (sourceKey === targetKey && sourceValue !== targetValue)
            )
        )
    );
};
