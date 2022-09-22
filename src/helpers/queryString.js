import cryptoRandomString from 'crypto-random-string';

export const queryString = () => {

    const clientId = '3f182385c47b4459b03bba8df1a09d47';
    const AuthUrl = 'https://accounts.spotify.com/authorize?';
    const state = cryptoRandomString({ length: 16 });
    const scope = 'user-read-private user-read-email user-modify-playback-state user-read-playback-state user-read-recently-played streaming user-top-read user-library-read user-library-modify playlist-modify-public playlist-read-private playlist-modify-private'
    const redirect_uri = 'http://localhost:3000/';

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

