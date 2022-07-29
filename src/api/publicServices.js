import axios from 'axios';

//creo instancia con la misma url base para todas las peticiones
const instance = axios.create({ baseURL: 'https://api.spotify.com/v1' })


export const getPublicToken = async () => {

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
        console.log(error)
        return Promise.reject(error)
    })

// hacer peticiones get, a traves de la instancia creada
export function getPublicData(endpoint, n) {
    return instance.get(endpoint, {
        params: { limit: n }
    })
        .then(res => {  //**TODO- mirar si puedo quitar este then y en useGetData setear response.data
            // console.log(res)
            return res.data
        })
}