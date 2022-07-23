export type Chapter = {
    id: string,
    content: string,
    title: string,
    isFinalChapter: boolean,
    choices: Array<Choice>
    positionX: number,
    positionY: number
}

export type Choice = {
    id: string,
    name: string,
    text: string,
    parentChapter: string,
    nextChapter: string,
}

export type Validator = {
    validationFunctions: Array<ValidationFunction>
}

export type ValidationFunction = {
    validate: (value: string, data: Map<string, any>) => Array<string>,
}

export type Story = {
    id: string,
    coverPage: string,
    genre: string,
    language: string,
    published: boolean,
    title: string,
    author: any,
    slug: string,
    firstChapterId: string
}
