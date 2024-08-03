
export interface Function {
    readonly id: number;
    readonly name: string;
    readonly source: string;
};

export interface FunctionNode {
    readonly func: Function;
    readonly invocations: number[];
};

export interface NodeLookup {
    [id: number]: FunctionNode;
};

export interface WorkUnit {
    readonly lookup: NodeLookup;
    readonly mainIds: number[];
}