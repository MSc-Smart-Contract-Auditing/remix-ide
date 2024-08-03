import { CompilationResult, Contract } from "../../models/contract.model";
import { FunctionNode, NodeLookup, WorkUnit } from "../../models/ast.model";
import { getFunctionDefinitions, getReferencedDeclarations } from "./query.utils";

export class ASTHandler {

    static processCompilationResult(compilationResult: CompilationResult): WorkUnit {

        const mainNodes = ASTHandler.processContract(compilationResult.root);
        const mainIds: number[] = Object.keys(mainNodes).map(Number);

        // Join all dependencies into a single object and flatten
        const lookup = compilationResult.dependencies
            .map(ASTHandler.processContract)
            .reduce((acc, val) => Object.assign(acc, val), {});

        Object.assign(lookup, mainNodes);

        return { lookup, mainIds };
    }

    private static processContract(contract: Contract): NodeLookup {
        return ASTHandler.prepareFunctions(contract);
    }

    private static fixIndentation(sourceCode: string): string {
        const lines = sourceCode.split("\n");
        if (lines.length === 0) {
            return sourceCode;
        }

        // Find the first non-whitespace character in the first line to determine the initial indentation
        const firstLineIndent = lines[0].length - lines[0].trimStart().length;
        // Adjust all lines to reduce the indentation by the amount found in the first line
        const adjustedLines = lines.map(line => {
            if (line.length !== line.trimStart().length) {
                return line.slice(firstLineIndent);
            }
            return line;
        });

        return adjustedLines.join("\n");
    }

    private static extractSourceCode(functionAst: any, source: string): string {
        const [start, length] = functionAst["src"].split(":").map(Number);
        const body = source.slice(start, start + length);
        return ASTHandler.fixIndentation(body);
    }

    private static prepareFunctions(contract: Contract): NodeLookup {
        const functionAsts = getFunctionDefinitions(contract.ast);
        const lookup: NodeLookup = {};

        for (const functionAst of functionAsts) {
            const invocations = getReferencedDeclarations(functionAst);
            const func = {
                id: Number(functionAst["id"]),
                name: functionAst["name"],
                source: ASTHandler.extractSourceCode(functionAst, contract.raw),
            };

            lookup[func.id] = {
                func,
                invocations,
            };
        }

        return lookup;
    }
}
