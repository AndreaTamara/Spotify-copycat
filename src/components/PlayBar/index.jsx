import { useContext, useEffect, useState } from 'react'
import SpotifyWebPlayer from 'react-spotify-web-playback/lib'
import { getUserData } from '../../api/privateServices'
import { authContext } from '../../context/authContext'
import { playContext } from '../../context/playContext'
import './PlayBar.css'

export const PlayBar = () => {
  let token = localStorage.getItem('token')
  console.log(token)
  const {loggedIn}= useContext(authContext)
  const { currentUri, setCurrentTrack} = useContext(playContext)
  const [error, setError]= useState(false)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    setPlay(true)
  }, [currentUri])

  
  useEffect(() => {
    if(currentUri) {
      localStorage.setItem('previousUri',currentUri)
      // localStorage.setItem('previousTrack',currentTrack)
    }
    if(loggedIn){
      getUserData()
        .then(()=>{
          token = localStorage.getItem('token')
        } )
    }
  }, [error])

  // const findOffset = ()=>{
  //   const track= localStorage.getItem('previousTrack');
  //   console.log(track)
  //   const list = (localStorage.getItem('previousUri')).split(',')
  //   console.log(list)
  //   const offset = list.findIndex(item=>item===track)
  //   console.log(offset)
  //   return offset>0?offset:0
  // }
  

  return (
    <div className='play-bar'>
      <SpotifyWebPlayer
        token={token}
        showSaveIcon
        syncExternalDevice
        uris={currentUri ? currentUri : (localStorage.getItem('previousUri'))?.split(',')}
        // offset={error?findOffset():0}
        play={play}
        autoPlay={true}
        callback={state => {
          if (!state.isPlaying) setPlay(false)
          console.log(state)
          if (state.status==='ERROR'&&state.error==='Authentication failed'){setError(true)}
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
          activeColor:'hsl(143, 93%, 59%)',
          errorColor: 'hsl(0,0%,100%)'
        }}

      />
    </div>
  )
}
