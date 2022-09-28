import axios from 'axios';

//creo instancia con la misma url base para todas las peticiones
const instance = axios.create({ baseURL: 'https://api.spotify.com/v1' })


export const getPublicToken = async () => {

    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    const AutUrl = 'https://accounts.spotify.com/api/token';

    const result = await axios(
        {
            method: 'post',
            url: AutUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            data: 'grant_type=client_credentials'
        });
    return result.data.access_token;
}

//interceptor de solicitud para la instancia creada, a todas las peticiones 
//que haga con esa instancia voy a agragarle el header de authorization
instance.interceptors.request.use((config) => {
    const newConfig = { ...config }
    const token = localStorage.getItem('token')
    newConfig.headers.Authorization = `Bearer ${token}`
    return newConfig
})

//interceptor de respuesta para la instancia creada, si la petición
//es exitosa devuelvo la respuesta, si genera algún error por token expirado o token inexistente
//entonces solicito un nuevo token, si lo obtengo lo almaceno en localstorage y recargo el navegador
//para volver a llamar a mi hook y hacer de nuevo las peticiones con un token actualizado,
//si no obtengo un nuevo token borro lo que tenga en localstorage y recargo para reinicir la app nuevamente,
//si es cualquier otro tipo de error simplemente lo devuelvo.
instance.interceptors.response.use((response) => response,
    (error) => {
        if (error.response.status === 401 || error.response.status === 400) {
            getPublicToken()
                .then(res => localStorage.setItem('token', res))
                .catch(() => localStorage.clear())
                .finally(() => window.location.reload())
        }
        return Promise.reject(error)
    })

// hacer peticiones get, a traves de la instancia creada
export function getPublicData(endpoint, n) {
    return instance.get(endpoint, {
        params: { limit: n }
    })
        .then(res => { return res.data })
}