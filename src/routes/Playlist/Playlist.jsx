import { DetailHeader } from '../../components/DetailHeader'
import { TrackCard } from '../../components/TrackCard'
import { useSelector } from 'react-redux'
import { useGetData } from '../../hooks/useGetData'
import { itemsPlaylistUrl, playlistUrl } from '../../api/endpoints'
import { convertMstoMin } from '../../helpers/convertToMin'
import { useParams } from 'react-router-dom'
import { cutTextString } from '../../helpers/cutTextString'
import { DetailViewContainer } from '../../components/DetailViewContainer'
import { DetailViewCommandBar } from '../../components/DetailViewCommandBar'
import { DetailTrackList } from '../../components/DetailTracksList'
import { useState } from 'react'
import { AddSongs } from '../../components/AddSongs'


export const Playlist = () => {

  const { logged, user } = useSelector(state => state.log)
  const { playlistId } = useParams()
  // console.log(playlistId)
  const { data: itemsPlaylist, loading: itemsPlaylistLoading, error: itemsPlaylistError } = useGetData(itemsPlaylistUrl(playlistId), logged, false)
  const { data: playlist, loading: playlistLoading, error: playlistError } = useGetData(playlistUrl(playlistId), logged, false)
  
  const [addSongs, setAddsongs]=useState(false)
  const owned = (playlist?.owner.id === user?.id)? true : false

  // const handleAddsongs =()=>{
  //   setAddsongs(prev=>!prev)
  // }

  return (
    <DetailViewContainer>
      {playlistLoading && <p>loading...</p>}
      {playlistError && <p>ocurrió un error: {playlistError.error?.message}</p>}

      {playlist &&
        <DetailHeader
          url={playlist?.images[0].url}
          type={playlist?.type}
          name={playlist?.name}
          description={playlist?.description}
          tracks={playlist?.tracks.total}
        />}
      <DetailViewCommandBar
        uri={playlist?.uri}
        id={playlist?.id}
        type='playlist'
        owned={owned}
        addSongsClick={()=>setAddsongs(true)} />
        {addSongs&& <AddSongs handleClose={setAddsongs}/>}
      <DetailTrackList>
        {itemsPlaylistLoading && <p>loading...</p>}
        {itemsPlaylistError && <p>ocurrió un error: {itemsPlaylistError.error?.message}</p>}
        {itemsPlaylist?.items.map((item, i) => {
          return (
            <TrackCard
              uri={item.track.uri}
              key={item.track.id}
              id={item.track.id}
              number={i + 1}
              owned={owned}
              name={cutTextString(item.track.name, 25)}
              author={item.track.artists.map(artist => {
                return { name: artist.name, id: artist.id }
                // <Link to={'/artist/'+artist.id} key={artist.id}>{artist.name}</Link>
              })}
              album={cutTextString(item.track.album.name, 25)}
              url={item.track.album.images[0].url}
              time={convertMstoMin(item.track.duration_ms)}
              albumId={item.track.album.id}
            />
          )
        })}
      </DetailTrackList>
    </DetailViewContainer>
  )
}
