/**
 * A basic class that creates a token for the given term As it will convert to an object instance of the class,
 * it gives uniqueness to the system.
 */
export class InjectionToken {
    constructor(readonly keyword: string) {}
}
