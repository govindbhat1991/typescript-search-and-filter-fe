/** keys to store metadata for specific purposes */
export const METADATA_KEYS: Record<string, Symbol> = {
    Watch: Symbol('wc-metadata:watch'),
    Input: Symbol('wc-metadata:input'),
    Output: Symbol('wc-metadata:output'),
    Component: Symbol('wc-metadata:component'),
    Module: Symbol('wc-metadata:module'),
    Provider: Symbol('wc-metadata:provider'),
    Inject: Symbol('wc-metadata:inject'),
    ConstructorParams: Symbol('design:paramtypes'),
};
