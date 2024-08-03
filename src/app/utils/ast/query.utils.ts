export function getFunctionDefinitions(data: any) {
    let result: any[] = [];
    data.nodes.forEach((node: any) => {
        if (node.nodeType === "ContractDefinition") {
            node.nodes.forEach((subNode: any) => {
                if (subNode.nodeType === "FunctionDefinition") {
                    result.push(subNode);
                }
            });
        }
    });
    return result;
}

export function getReferencedDeclarations(data: any) {
    let result: number[] = [];
    function recursiveSearch(node: any) {
        if (node && typeof node === "object") {
            if (node.nodeType === "MemberAccess" && node.referencedDeclaration) {
                result.push(node.referencedDeclaration);
            }
            for (let key in node) {
                if (node.hasOwnProperty(key)) {
                    recursiveSearch(node[key]);
                }
            }
        }
    }
    recursiveSearch(data);
    return result;
}


