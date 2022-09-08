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
import { addTrackToPlaylist, removeTrackFromPlaylist } from '../../api/privateServices'
import { Loader } from '../../components/Loader'
import { Info } from '../../components/Info'
import {Modal} from '../../components/Modal'
import {CreatePlaylistForm} from '../../components/CreatePlaylistForm'



export const Playlist = () => {

  const { logged, user } = useSelector(state => state.log)
  const { playlistId } = useParams()
  const [snapshotId, setSnapshotId] = useState('')
  // console.log(playlistId)
  const { data: itemsPlaylist, loading: itemsPlaylistLoading, error: itemsPlaylistError } = useGetData(itemsPlaylistUrl(playlistId), logged, false, snapshotId)
  const { data: playlist, loading: playlistLoading } = useGetData(playlistUrl(playlistId), logged, false, snapshotId)
  const [addSongs, setAddsongs] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const owned = (playlist?.owner.id === user?.id) ? true : false

  const onAddSong = (uri) => {
    if (logged) {
      addTrackToPlaylist(playlistId, uri)
        .then(res => setSnapshotId(res))
    }
  }

  const onDeleteSong = (uri) => {
    if (logged)
      removeTrackFromPlaylist(playlistId, uri)
        .then(res => setSnapshotId(res))
  }

  return (
    <DetailViewContainer>
      {(playlistLoading || itemsPlaylistLoading) && <Loader height='14rem' />}
      {itemsPlaylistError && <Info msn={`Error ${itemsPlaylistError?.status}: ${itemsPlaylistError?.message}`} />}
      {(playlist && itemsPlaylist) &&
        <>
          <DetailHeader
            url={playlist?.images[0]?.url}
            type={playlist?.type}
            name={playlist?.name}
            description={playlist?.description}
            tracks={playlist?.tracks.total}
          />
          <DetailViewCommandBar
            uri={playlist?.uri}
            id={playlist?.id}
            type='playlist'
            owned={owned}
            addSongsClick={() => setAddsongs(true)}
            setOpenModal={setOpenModal} />
          {addSongs && <AddSongs handleClose={setAddsongs} onAddSong={onAddSong} />}
          <DetailTrackList>
            {itemsPlaylist?.items.map((item, i) => {
              return (
                <TrackCard
                  onDeleteSong={onDeleteSong}
                  uri={item.track.uri}
                  key={item.track.id}
                  id={item.track.id}
                  number={i + 1}
                  owned={owned}
                  name={cutTextString(item.track.name, 25)}
                  author={item.track.artists.map(artist => {
                    return { name: artist.name, id: artist.id }
                  })}
                  album={cutTextString(item.track.album.name, 25)}
                  url={item.track.album.images[0].url}
                  time={convertMstoMin(item.track.duration_ms)}
                  albumId={item.track.album.id}
                />
              )
            })}
          </DetailTrackList>
        </>}
      {openModal &&
        <Modal>
          <CreatePlaylistForm
            setOpenModal={setOpenModal}
            edit
            editDescription={playlist?.description}
            editName={playlist?.name}
            playlistId={playlistId}
            setSnapshotId={setSnapshotId} />
        </Modal>}
    </DetailViewContainer>
  )
}
