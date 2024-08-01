export interface Contract {
    name: string;
    raw: string;
    ast: Object;
}

export interface CompilationResult {
    root: Contract;
    dependencies: Contract[];
}