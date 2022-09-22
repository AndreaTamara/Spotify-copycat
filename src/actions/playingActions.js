//actions
export const SELECT_URI_TO_PLAY = 'SELECT_URI_TO_PLAY'
export const SET_CURRENT_PLAYING_TRACK = 'SET_CURRENT_PLAYING_TRACK'

//action creators
export const selectUriToPlay = (uri) => ({ type:SELECT_URI_TO_PLAY, payload: uri});

export const setCurrentPlayingTrack = (uri) => ({ type:SET_CURRENT_PLAYING_TRACK, payload: uri});

