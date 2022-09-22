import { useEffect, useState } from 'react'
import SpotifyWebPlayer from 'react-spotify-web-playback/lib'
import { getUserData } from '../../api/privateServices'
import { useSelector,useDispatch } from 'react-redux'
import './PlayBar.css'
import { selectUriToPlay, setCurrentPlayingTrack } from '../../actions/playingActions'

export const PlayBar = () => {

  let token = localStorage.getItem('token')
  const {logged} = useSelector(state=>state.log)
  const dispatch = useDispatch()
  const { currentUri} = useSelector(state=>state.playing)
  const [error, setError]= useState(false)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    setPlay(true)
  }, [currentUri])

  
  useEffect(() =>{
    if(logged){
      getUserData()
      .then(()=>dispatch((selectUriToPlay(localStorage.getItem('currentUri')))))
    }
  }, [error,logged])
  
  return (
    <div className='play-bar'>
      <SpotifyWebPlayer
        token={token}
        showSaveIcon
        syncExternalDevice
        uris={currentUri ? currentUri : [] }
        play={play}
        autoPlay={true}
        callback={state => {
          if (!state.isPlaying) setPlay(false)
          if (state.status==='ERROR'&&state.error==='Authentication failed'){
            setError(true)
            localStorage.setItem('currentUri',currentUri)
          }
          if (state.status==='ERROR'&&state.error==='Invalid token scopes.'){setError(true)}
          if (state.isPlaying)dispatch(setCurrentPlayingTrack(state.track.uri))
        }}
        styles={{
          bgColor: 'hsl(225, 25%, 9%)',
          sliderTrackColor: 'hsl(226, 9%, 49%)',
          sliderColor: 'hsl(0,0%,100%)',
          color: 'hsl(0,0%,100%)',
          sliderHandleColor: 'hsl(0,0%,100%)',
          trackNameColor: 'hsl(0,0%,100%)',
          trackArtistColor: 'hsl(226, 16%, 69%)',
          activeColor:'hsl(143, 93%, 59%)',
          errorColor: 'hsl(0,0%,100%)'
        }}

      />
    </div>
  )
}
