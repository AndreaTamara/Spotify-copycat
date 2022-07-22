
    export const getToken = async () => {
        const clientId = '3f182385c47b4459b03bba8df1a09d47';
        const clientSecret = '89b84d2544ac44938950c2fdcca11cd0';

        const result = await fetch('https://accounts.spotify.com/api/token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
                    'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
                },
                body: 'grant_type=client_credentials'
            
            });

        

        const data = await result.json();
        // console.log(data.access_token)
        return data.access_token;
    }



