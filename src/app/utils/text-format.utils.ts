export const emptyResponse = `Got an empty response from the server. Please try again.`;

export enum ElementType {
    block = 'block',
    inline = 'inline',
    text = 'text',
}

export interface Element {
    type: ElementType;
    value: string;
}

function consume(text: string, currentPosition: number): { consumed: string, newPosition: number; type: ElementType; } {
    let consumed = "";

    while (currentPosition < text.length && text[currentPosition] !== "`") {
        consumed += text[currentPosition];
        currentPosition++;
    }

    const type = text[currentPosition + 1] === "`" ? ElementType.block : ElementType.inline;
    const newPosition = currentPosition + (type === ElementType.inline ? 1 : 3);

    return { consumed, newPosition, type };
}

function handleNewlines(elements: Element[]): Element[] {
    for (let element of elements) {
        if (element.type === ElementType.text) {
            element.value = element.value.replace(/\n/g, "<br>");
        }
    }

    return elements;
}

function trimBlocks(elements: Element[]): Element[] {
    for (let element of elements) {
        if (element.type === ElementType.block) {
            element.value = element.value.trim();
        }
    }

    return elements;
}

export function textToElements(text: string): Element[] {
    const elements: Element[] = [];
    let currentPosition = 0;
    let currentType = ElementType.text;

    text = text.trim();

    while (currentPosition < text.length) {
        let { consumed, newPosition, type } = consume(text, currentPosition);
        elements.push({ type: currentType, value: consumed });

        if (currentType === type) {
            currentType = ElementType.text;
        } else {
            currentType = type;
        }

        currentPosition = newPosition;
    }

    if (elements.length == 0) {
        // TODO: Error handling
        elements.push({ type: ElementType.text, value: emptyResponse });
    }

    if (elements && elements[0].value === "") {
        elements.shift();
    }

    return trimBlocks(handleNewlines(elements));
}