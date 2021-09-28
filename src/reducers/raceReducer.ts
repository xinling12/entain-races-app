import { IRaces, IRace } from "../types"

export interface RaceState {
    races: string[];
}
const initialState = {
    races: [],
};
// const initialState = new Array();

type Action = {type:"UPDATE_RACES", payload: []}
export const raceReducer = (state:RaceState = initialState, action:Action) => {
    switch(action.type){
        case "UPDATE_RACES": {
            return {...state, races: action.payload}
        }
        default:
            return state
    }
}