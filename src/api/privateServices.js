import axios from 'axios';

const instance = axios.create({ baseURL: 'https://api.spotify.com/v1' })

export const getPrivateToken = async (code) => {

    const clientId = '3f182385c47b4459b03bba8df1a09d47';
    const clientSecret = '89b84d2544ac44938950c2fdcca11cd0';
    const AutUrl = 'https://accounts.spotify.com/api/token';
    const redirect_uri = 'http://localhost:3000/';

    const result = await axios(
        {
            method: 'post',
            url: AutUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            data: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`
        });
    return result.data;
}


export const getRefreshedToken = async () => {

    const refreshToken = localStorage.getItem('refreshToken')
    const clientId = '3f182385c47b4459b03bba8df1a09d47';
    const clientSecret = '89b84d2544ac44938950c2fdcca11cd0';
    const AutUrl = 'https://accounts.spotify.com/api/token';

    const result = await axios(
        {
            method: 'post',
            url: AutUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            data: `grant_type=refresh_token&refresh_token=${refreshToken}`
        });
    return result.data;
}


instance.interceptors.request.use((config) => {
    const newConfig = { ...config }
    const token = localStorage.getItem('token')
    newConfig.headers.Authorization = `Bearer ${token}`
    return newConfig
})

instance.interceptors.response.use((response) => response,
    (error) => {
        if (error.response.status === 401) {
            getRefreshedToken()
                .then(res => localStorage.setItem('token', res.access_token))
                .catch(() => localStorage.clear())
                .finally(() => window.location.reload())
        }
        return Promise.reject(error)
    })

export function getUserData() {
    return instance.get('/me')
        .then(res => {
            return res.data
        })
}

export function getPrivateData(endpoint, n) {
    return instance.get(endpoint, {
        params: { limit: n }
    })
        .then(res => {return res.data})
}

// check saved Track
export function checkSavedTrack(trackId) {
    return instance.get(`/me/tracks/contains?ids=${trackId}`)
        .then(res => {
            return res.data[0]
        })
}

//save track
export function saveTrack(trackId) {
    return instance.put(`/me/tracks?ids=${trackId}`)
        .then(res => {
            return res.status
        })
}

//remove saved track
export function removeSavedTrack(trackId) {
    return instance.delete(`/me/tracks?ids=${trackId}`)
        .then(res => {
            return res.status
        })
}

// check followed playlist
export function checkFollowedPlaylist(playlistId, userId) {
    return instance.get(`/playlists/${playlistId}/followers/contains?ids=${userId}`)
        .then(res => {
            return res.data[0]
        })
}

//follow playlist
export function followPlaylist(playlistId) {
    return instance.put(`/playlists/${playlistId}/followers`)
        .then(res => {
            return res.status
        })
}

//unfollow playlist
export function unFollowPlaylist(playlistId) {
    return instance.delete(`/playlists/${playlistId}/followers`)
        .then(res => {
            return res.status
        })
}

// check saved album
export function checkSavedAlbum(albumId) {
    return instance.get(`/me/albums/contains?ids=${albumId}`)
        .then(res => {
            return res.data[0]
        })
}

//save album
export function saveAlbum(albumId) {
    return instance.put(`/me/albums/?ids=${albumId}`)
        .then(res => {
            return res.status
        })
}

//remove saved album
export function removeSavedAlbum(albumId) {
    return instance.delete(`/me/albums/?ids=${albumId}`)
        .then(res => {
            return res.status
        })
}

//add track to a playlist 
export function addTrackToPlaylist(playlistId, uriTrack) {
    return instance.post(`/playlists/${playlistId}/tracks?uris=${uriTrack}&position=0`)
        .then(res => {
            return res.data.snapshot_id
        })
}

//remove track from a playlist 
export function removeTrackFromPlaylist(playlistId, uriTrack) {
    return instance.delete(`/playlists/${playlistId}/tracks`,
        { data: { tracks: [{ uri: uriTrack }] } })
        .then(res => {
            return res.data.snapshot_id
        })
}

//Create a playlist
export function createPlaylist(userId, name, description) {
    return instance.post(`/users/${userId}/playlists`,
        { "name": name, "description": description, "public": true })
        .then(res => {
            return res
        })
}

//Edit playlist details
export function editPlaylist(playlistId, name, description) {
    return instance.put(`/playlists/${playlistId}`,
        { name, description: description ? description : undefined, public: true })
        .then(res => {
            return res
        })
}

