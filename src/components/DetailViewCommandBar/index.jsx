import { useEffect, useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { checkFollowedPlaylist, checkSavedAlbum, followPlaylist, removeSavedAlbum, saveAlbum, unFollowPlaylist } from '../../api/privateServices'
import { PlayBtn } from '../PlayBtn'
import './DetailViewCommandBar.css'

export const DetailViewCommandBar = ({ artistView, savedView, uri, id, type, owned }) => {
  const { logged, user } = useSelector(state => state.log)
  const [isSaved, setIsSaved] = useState(null)

  const checkIfIsSaved = async (id, userId, type) => {
    if (id) {
      let response
      switch (type) {
        case 'playlist': response = await checkFollowedPlaylist(id, userId)
          break;
        case 'album': response = await checkSavedAlbum(id)
          break;
        default: return
      }
      setIsSaved(response)
    }
  }

  useEffect(() => {
    if (logged) checkIfIsSaved(id, user.id, type)
  }, [id, logged, user, type])

  const handleOnClickFollow = async (id, userId, type) => {
    if (!logged) return
    let request
    switch (type) {
      case 'playlist':
        request = isSaved ? unFollowPlaylist(id) : followPlaylist(id)
        break;
      case 'album':
        request = isSaved ? removeSavedAlbum(id) : saveAlbum(id)
        break;
      default: return
    }
    const response = await request
    if (response === 200) checkIfIsSaved(id, userId, type)
  }

  return (
    <section className={`command-bar ${artistView && 'command-bar-artistView'}`}>
      <PlayBtn uri={uri} />
        {(!savedView && !artistView &&!owned )&&
          <FiHeart className={`save-btn ${isSaved && 'active'}`}
            onClick={() => handleOnClickFollow(id, user.id, type)}
          />}
        {owned &&
          <button className='add-songs-btn'>Add songs</button>
        }
    </section>
  )
}
