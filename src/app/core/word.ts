export interface Word {
    name: string,
    definitions: Definition[],
}

export interface Definition {
    value: string,
    synonyms: Synonym[],
    antonyms: Antonym[],
}

export interface Synonym {
    value: string,
}

export interface Antonym {
    value: string,
}