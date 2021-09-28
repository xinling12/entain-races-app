import { raceReducer } from "./raceReducer"
import { categoryReducer } from "./categoryReducer"
import { combineReducers } from "redux"

export const rootReducers = combineReducers({
    race: raceReducer,
    category: categoryReducer
})

export type RootState = ReturnType<typeof rootReducers>