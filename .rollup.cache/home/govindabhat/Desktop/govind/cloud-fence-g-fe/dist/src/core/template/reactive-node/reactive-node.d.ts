export declare class ReactiveNode {
    #private;
    constructor(startNode: ChildNode, endNode?: ChildNode | null);
    get parentNode(): Node;
    get startNode(): ChildNode;
    get currentNode(): Node;
    get endNode(): ChildNode | null;
    /** handles rendering the templates */
    render(value: unknown): void;
    /** check if value is not equal to the already rendered value */
    private isValueChanged;
    /** handle node value */
    private addNode;
    /** handle text value */
    private addTextNode;
}
//# sourceMappingURL=reactive-node.d.ts.map