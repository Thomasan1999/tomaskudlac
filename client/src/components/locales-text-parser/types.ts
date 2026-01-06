export enum LocalesTextParserNodeType {
    SLOT = 'slot',
    STRONG = 'strong',
    TEXT = 'text',
}

export interface LocalesTextParserNode {
    type: LocalesTextParserNodeType;
    text: string;
    children?: LocalesTextParserNode[];
}
