import { INextToGoIds } from "../types"

const initialState = {
    next_to_go_ids: []
}

type Action = {type:"Add_NEXT_TO_GO_ID", payload: []}
export const nextToGoReducer = (state:INextToGoIds = initialState, action:Action) => {
    switch(action.type){
        case "Add_NEXT_TO_GO_ID": {
            return {...state, next_to_go_ids: action.payload}
        }
        default:
            return state
    }
}