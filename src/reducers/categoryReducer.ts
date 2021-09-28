export interface CategoryState {
    isGreyHoundCheck: boolean,
    isHarnessCheck: boolean,
    isHorseCheck: boolean,
}

const initialState : CategoryState = {
    isGreyHoundCheck: true,
    isHarnessCheck: true,
    isHorseCheck: true,
}

interface CheckGreyhound {
    type: 'UPDATE_GREYHOUND';
}

interface CheckHarness {
    type: 'UPDATE_HARNESS';
}

interface CheckHorse {
    type: 'UPDATE_HORSE';
}

type Action = CheckGreyhound | CheckHarness | CheckHorse

export const categoryReducer = (state : CategoryState = initialState, action:Action) => {
    switch(action.type){
        
        case "UPDATE_GREYHOUND": {
            return {...state, isGreyHoundCheck: !state.isGreyHoundCheck
            }
        }
        case "UPDATE_HARNESS": {
            return {...state, isHarnessCheck: !state.isHarnessCheck}
        }
        case "UPDATE_HORSE": {
            return {...state, isHorseCheck: !state.isHorseCheck}
        }
        default:
            return state
    }
}