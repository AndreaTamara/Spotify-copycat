import axios from 'axios';

const instance = axios.create({ baseURL: 'https://api.spotify.com/v1' })

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
    //console.log(result.data.access_token)
    return result.data.access_token;
}

instance.interceptors.request.use((config) => {
    const newConfig = {
        ...config
    }
    const token = localStorage.getItem('token')
    newConfig.headers.Authorization = `Bearer ${token}`
    return newConfig
})


instance.interceptors.response.use((response) => response,
    (error) => {
        if (error.response.status === 401 || error.response.status === 400) {
            getToken().then(
                res => localStorage.setItem('token', res)
            ).catch(() =>
                localStorage.clear()
            ).finally(
                () => window.location.reload()
            )


        }
        console.log(error)
        return Promise.reject(error)
    })

export function getData(path) {
    return instance.get(path, {
        params: { limit: 20 }
    }).then(res => {
        console.log(res)
        return res.data
    })
}