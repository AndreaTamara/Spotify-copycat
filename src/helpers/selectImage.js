import artistCover from '../assets/artist-cover.jpg'
import artist from '../assets/artist-placeholder.PNG'
import playlist from '../assets/music-placeholder.PNG'
import artistCover2 from '../assets/artist-cover2.jpg'

export const selectImage = (imageApi, type) => {
    if (imageApi) return imageApi
    if (!type) return playlist
    switch (type) {
        case 'artist': return artist
        case 'artistCover': return artistCover
    }
}
export const music = 'https://i.postimg.cc/L6x53pr8/music-placeholder.png'

export const changeSrc = (newSrc, reference) => {
    if (reference.src === newSrc) return
    reference.onError = null
    reference.src = newSrc;

  }