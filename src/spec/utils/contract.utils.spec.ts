import { Contract } from "../../app/models/contract.model";
import { extractData, prepareObject } from "../../app/utils/contract.utils";

describe('Contract utilities', () => {
    const mockSource = {
        sources: {
            'MainContract.sol': { content: 'contract Main { }' },
            'Dependency.sol': { content: 'contract Dep { }' }
        }
    };

    const mockData = {
        sources: {
            'MainContract.sol': { ast: { type: 'ContractDefinition', name: 'Main' } },
            'Dependency.sol': { ast: { type: 'ContractDefinition', name: 'Dep' } }
        }
    };

    const contractName = 'MainContract.sol';

    const expectedExtractDataResult: Contract = {
        name: contractName,
        raw: 'contract Main { }',
        ast: { type: 'ContractDefinition', name: 'Main' }
    };

    const expectedPrepareObjectResult = {
        root: expectedExtractDataResult,
        dependencies: [
            {
                name: 'Dependency.sol',
                raw: 'contract Dep { }',
                ast: { type: 'ContractDefinition', name: 'Dep' }
            }
        ]
    };

    it('extractData should correctly extract contract data', () => {
        const result = extractData(mockSource, mockData, contractName);
        expect(result).toEqual(expectedExtractDataResult);
    });

    it('prepareObject should prepare the root and dependencies correctly', () => {
        const result = prepareObject(mockSource, mockData, contractName);
        expect(result).toEqual(expectedPrepareObjectResult);
    });
});
