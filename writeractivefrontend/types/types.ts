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