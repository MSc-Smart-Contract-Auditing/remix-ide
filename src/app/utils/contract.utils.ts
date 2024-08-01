import { Contract, CompilationResult } from '../models/contract.model';  // Adjust path as needed

/**
 * Extracts contract data from the compilation result.
 * @param compilationResult - The compilation result object.
 * @param contractName - The name of the contract.
 * @returns The extracted contract data.
 */
export function extractData(
    source: any,
    data: any,
    contractName: string
): Contract {
    return {
        name: contractName,
        raw: source.sources[contractName].content,
        ast: data.sources[contractName].ast,
    };
}

/**
 * Prepares an object containing the root contract and dependencies.
 * @param compilationResult - The compilation result object.
 * @param mainContractName - The name of the main contract.
 * @returns An object containing the root contract and its dependencies.
 */
export function prepareObject(
    source: any,
    data: any,
    mainContractName: string
): CompilationResult {
    return {
        root: extractData(source, data, mainContractName),
        dependencies: Object.keys(data.sources)
            .filter(contract => contract !== mainContractName)
            .map(entry => extractData(source, data, entry))
    };
}