export const emptyResponse = `Got an empty response from the server. Please try again.`;

export enum Type {
    block = 'block',
    inline = 'inline',
    text = 'text',
}

export interface Element {
    type: Type;
    value: string;
}

function consume(text: string, currentPosition: number): { consumed: string, newPosition: number; type: Type; } {
    let consumed = "";

    while (currentPosition < text.length && text[currentPosition] !== "`") {
        consumed += text[currentPosition];
        currentPosition++;
    }

    const type = text[currentPosition + 1] === "`" ? Type.block : Type.inline;
    const newPosition = currentPosition + (type === Type.inline ? 1 : 3);

    return { consumed, newPosition, type };
}

function handleNewlines(elements: Element[]): Element[] {
    for (let element of elements) {
        if (element.type === Type.text) {
            element.value = element.value.replace(/\n/g, "<br>");
        }
    }

    return elements;
}

function trimBlocks(elements: Element[]): Element[] {
    for (let element of elements) {
        if (element.type === Type.block) {
            element.value = element.value.trim();
        }
    }

    return elements;
}

export function textToElements(text: string): Element[] {
    const elements: Element[] = [];
    let currentPosition = 0;
    let currentType = Type.text;

    text = text.trim();

    while (currentPosition < text.length) {
        let { consumed, newPosition, type } = consume(text, currentPosition);
        elements.push({ type: currentType, value: consumed });

        if (currentType === type) {
            currentType = Type.text;
        } else {
            currentType = type;
        }

        currentPosition = newPosition;
    }

    if (elements.length == 0) {
        // TODO: Error handling
        elements.push({ type: Type.text, value: emptyResponse });
    }

    if (elements && elements[0].value === "") {
        elements.shift();
    }

    return trimBlocks(handleNewlines(elements));
}