import cryptoRandomString from 'crypto-random-string';

export const queryString =()=>{

    const clientId = '3f182385c47b4459b03bba8df1a09d47';
    const AuthUrl = 'https://accounts.spotify.com/authorize?';
    const state = cryptoRandomString({length: 16});
    const scope = 'user-read-private user-read-email user-modify-playback-state user-read-playback-state user-read-recently-played streaming user-top-read user-library-read user-library-modify'
    const redirect_uri= 'http://localhost:3000/';

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

//localhost:3000/?code=AQD-de3vQEvPIEXnWxDOENC2aQfDMulWl3IvuT3varj0N7dVHtZCxjSoA6CBDpnn_FVNPl4w-0EbxufVBHFzWmK5njW9TQIGuMi2Yy0qcbK06AgDIbq5vR3_upnvOklPZdyp0o9ug4v5yBeULG1sboV_fM82seUC7ZxiY2S3bIsOsrGnTwrE04XCYqPklTUuCb_DbcEcrTJl5d8pSfM1rksJxrRimh1nMLCzpaUwltugL7h0c-GkNhuwG0BrrHgb-rSq27j2QBP6x-Aj8GFCvCPFZWjrPeT3plxebWuYdZFw3ILYbrN152vROUWHuF4&state=90d671c2ea148b6f