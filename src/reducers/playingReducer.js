import { SELECT_URI_TO_PLAY, SET_CURRENT_PLAYING_TRACK } from '../actions/playingActions';

export const inicialState = {
    currentUri:null,
    currentTrack:''
}

export function playingReducer(state = inicialState, action) {
    switch (action.type) {
        case SELECT_URI_TO_PLAY:
            return {...state, currentUri:action.payload}

        case SET_CURRENT_PLAYING_TRACK:
            return {...state, currentTrack:action.payload}

        default: return state;
            
    }
}