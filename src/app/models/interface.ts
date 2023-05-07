
export interface Data {
    id: number,
    mark: string,
    marks: IMark[],
}

interface IMark {
    id: number,
    name: string,
    models: IModels[]
}
interface IModels {
    id: number,
    name: string
}

