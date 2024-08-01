import { Contract, CompilationResult } from "../../app/models/contract.model";

export const mockSource = {
    sources: {
        'MainContract.sol': { content: 'contract Main { }' },
        'Dependency.sol': { content: 'contract Dep { }' }
    }
};

export const mockData = {
    sources: {
        'MainContract.sol': { ast: { type: 'ContractDefinition', name: 'Main' } },
        'Dependency.sol': { ast: { type: 'ContractDefinition', name: 'Dep' } }
    }
};

export const mockTargetName = 'MainContract.sol';

export const mockExtractedData: Contract = {
    name: mockTargetName,
    raw: 'contract Main { }',
    ast: { type: 'ContractDefinition', name: 'Main' }
};

export const mockPreparedObject: CompilationResult = {
    root: mockExtractedData,
    dependencies: [
        {
            name: 'Dependency.sol',
            raw: 'contract Dep { }',
            ast: { type: 'ContractDefinition', name: 'Dep' }
        }
    ]
};