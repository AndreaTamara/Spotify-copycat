import { useContext, useEffect, useState } from 'react'
import SpotifyWebPlayer from 'react-spotify-web-playback/lib'
// import { authContext } from '../../context/authContext'
import { playContext } from '../../context/playContext'
import './PlayBar.css'

export const PlayBar = () => {
  const token = localStorage.getItem('token')
  // const {loggedIn}= useContext(authContext)
  const { currentUri, setCurrentTrack } = useContext(playContext)
  console.log('currentUri:' + currentUri)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    setPlay(true)
  }, [currentUri])


  return (
    <div className='play-bar'>
      <SpotifyWebPlayer
        token={token}
        showSaveIcon
        syncExternalDevice
        uris={currentUri ? currentUri : []}
        play={play}
        autoPlay={true}
        callback={state => {
          if (!state.isPlaying) setPlay(false)
          console.log(state.track)
          setCurrentTrack(state.track.uri)
        }}
        styles={{
          bgColor: 'hsl(225, 25%, 9%)',
          sliderTrackColor: 'hsl(226, 9%, 49%)',
          sliderColor: 'hsl(0,0%,100%)',
          color: 'hsl(0,0%,100%)',
          sliderHandleColor: 'hsl(0,0%,100%)',
          trackNameColor: 'hsl(0,0%,100%)',
          trackArtistColor: 'hsl(226, 16%, 69%)',
          // activeColor:'hsl(143, 93%, 59%)',
          errorColor: 'hsl(0,0%,100%)'
        }}

      />
    </div>
  )
}
