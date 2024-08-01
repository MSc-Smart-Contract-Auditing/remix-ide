export function textToHTML(text: string): string {
    return text;
    // .replace(/\n/g, '\\n')                                  // newlines
    // .replace(/```([^`]+)```/g, '<pre><code [highlight]="$1" language="solidity" [lineNumbers]></code></pre>'); // triple backticks (block)
    // .replace(/`([^`]+)`/g, '<pre><code [highlight]="$1" lang="solidity" [singleLine]></code></pre>');  // single backticks (inline)
}