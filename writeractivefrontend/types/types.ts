export type Chapter = {
    id: string | null,
    content: string,
    title: string,
    isFinalChapter: boolean,
    choices: Array<Choice>,
    positionX: number,
    positionY: number
}

export type Choice = {
    id: string | null,
    name: string | null,
    text: string | null,
    parentChapterId: string | null,
    nextChapterId: string | null,
}

export type Validator = {
    validationFunctions: Array<ValidationFunction>
}

export type ValidationFunction = {
    validate: (value: string, data: Map<string, any>) => Array<string>,
}

export type Story = {
    id: string | null,
    coverPage: string,
    genre: string,
    language: string,
    published: boolean,
    title: string,
    owner: any,
    slug: string,
    firstChapterId: string,
    description: string
}
