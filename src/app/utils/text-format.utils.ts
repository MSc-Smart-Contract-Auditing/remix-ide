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

export function textToElements(text: string): Element[] {
    const elements: Element[] = [];
    let currentPosition = 0;
    let currentType = Type.text;

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

    return elements;
}