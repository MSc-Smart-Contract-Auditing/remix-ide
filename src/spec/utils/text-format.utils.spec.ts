import { ElementType } from "../../app/utils/text-format.utils";
import { textToElements } from "../../app/utils/text-format.utils";

const plainText = 'Hello, World!';
const plainTextWithNewLines = 'Hello,\nWorld!';
const inlineCode = '`int a = 5;`';
const codeBlock = `\`\`\`
def get_user_input():
    user_input = input("Enter a number: ")
    return user_input
\`\`\``;
const composition1 = `${inlineCode}${plainText}${inlineCode}`;
const composition2 = `${plainText}\n\n${inlineCode}`;
const composition3 = `${plainText}\n${codeBlock}\n\n${plainText}`;
const composition4 = `${plainText}\n${codeBlock}\n\n${plainText}\n${codeBlock}`;

const elementsPlainText = [
    { type: ElementType.text, value: 'Hello, World!' }
];

const elementsPlainTextWithNewLines = [
    { type: ElementType.text, value: 'Hello,<br>World!' }
];

const elementsInlineCode = [
    { type: ElementType.inline, value: 'int a = 5;' }
];

const elementsCodeBlock = [
    { type: ElementType.block, value: `def get_user_input():\n    user_input = input("Enter a number: ")\n    return user_input` }
];

const elementsComposition1 = [
    { type: ElementType.inline, value: 'int a = 5;' },
    { type: ElementType.text, value: 'Hello, World!' },
    { type: ElementType.inline, value: 'int a = 5;' }
];

const elementsComposition2 = [
    { type: ElementType.text, value: 'Hello, World!<br><br>' },
    { type: ElementType.inline, value: 'int a = 5;' }
];

const elementsComposition3 = [
    { type: ElementType.text, value: 'Hello, World!<br>' },
    { type: ElementType.block, value: `def get_user_input():\n    user_input = input("Enter a number: ")\n    return user_input` },
    { type: ElementType.text, value: '<br><br>Hello, World!' }
];

const elementsComposition4 = [
    { type: ElementType.text, value: 'Hello, World!<br>' },
    { type: ElementType.block, value: `def get_user_input():\n    user_input = input("Enter a number: ")\n    return user_input` },
    { type: ElementType.text, value: '<br><br>Hello, World!<br>' },
    { type: ElementType.block, value: `def get_user_input():\n    user_input = input("Enter a number: ")\n    return user_input` }
];

describe('Text utilities', () => {
    it('handles plain text', () => {
        expect(textToElements(plainText)).toEqual(elementsPlainText);
    });

    it('handles plain text with new lines', () => {
        expect(textToElements(plainTextWithNewLines)).toEqual(elementsPlainTextWithNewLines);
    });

    it('handles inline code', () => {
        expect(textToElements(inlineCode)).toEqual(elementsInlineCode);
    });

    it('handles code block', () => {
        expect(textToElements(codeBlock)).toEqual(elementsCodeBlock);
    });

    it('handles composition 1', () => {
        expect(textToElements(composition1)).toEqual(elementsComposition1);
    });

    it('handles composition 2', () => {
        expect(textToElements(composition2)).toEqual(elementsComposition2);
    });

    it('handles composition 3', () => {
        expect(textToElements(composition3)).toEqual(elementsComposition3);
    });

    it('handles composition 4', () => {
        expect(textToElements(composition4)).toEqual(elementsComposition4);
    });
});