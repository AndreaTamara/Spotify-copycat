import axios from "axios";

    export const getToken = async () => {

        const clientId = '3f182385c47b4459b03bba8df1a09d47';
        const clientSecret = '89b84d2544ac44938950c2fdcca11cd0';
        const AutUrl = 'https://accounts.spotify.com/api/token';

        const result = await axios(
            {
                method: 'post',
                url: AutUrl,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
                    'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
                },
                data: 'grant_type=client_credentials'
            });
            console.log(result.data.access_token)
        return result.data.access_token;
    }
