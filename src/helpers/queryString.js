import cryptoRandomString from 'crypto-random-string';

export const queryString = () => {

    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const AuthUrl = 'https://accounts.spotify.com/authorize?';
    const state = cryptoRandomString({ length: 16 });
    const scope = 'user-read-private user-read-email user-modify-playback-state user-read-playback-state user-read-recently-played streaming user-top-read user-library-read user-library-modify playlist-modify-public playlist-read-private playlist-modify-private'
    const redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

    const queryParams = new URLSearchParams(
        {
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }
    )
    const result = AuthUrl + queryParams
    return result

}

