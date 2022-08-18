//centralizar todos los reducers de la app en uno solo
import { combineReducers } from "redux";
import { logReducer } from "./logReducer";
import { playingReducer } from "./playingReducer";


export const reducer = combineReducers(
    {
        log: logReducer,
        playing: playingReducer
    }
);

