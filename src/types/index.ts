export interface IRace {
    race_id: string,
    race_name: string,
    race_number: number,
    meeting_id: string,
    meeting_name: string,
    category_id: string,
    advertised_start: ISeconds
}

export interface ISeconds {
    seconds: number
}
export type IRaces = Array<IRace>

export interface INextToGoIds {
    next_to_go_ids: string[]
}