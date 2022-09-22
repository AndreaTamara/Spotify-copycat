import './DropdownMenu.css';
import { MdClose } from 'react-icons/md'
import { useGetData } from '../../hooks/useGetData';
import { userPlaylistUrl } from '../../api/endpoints';
import { useSelector } from 'react-redux';
import { addTrackToPlaylist } from '../../api/privateServices';
import { useState } from 'react';


export const DropdownMenu = ({ setOpenModal, uri }) => {

    const { logged, user } = useSelector(state => state.log)
    const { data } = useGetData(userPlaylistUrl, logged, true)
    const [notificacion, setNotification] = useState(false)

    const handleSelectOption = (playlistId, uri) => {
        if (!logged) return
        addTrackToPlaylist(playlistId, uri)
            .then((res) => {
                if (res) {
                    setNotification(true)
                    setTimeout(() => setOpenModal(false), 1000)
                }
            })
    }
    return (
        <nav className={`dropdown-container ${notificacion && 'notification'}`}>
            {notificacion ? <h1 className='dropdown-notification'>
                Added to playlist!
            </h1>
                :
                <>
                    <div className='dropdown-close'>
                        <MdClose onClick={() => setOpenModal(false)} />
                    </div>
                    <h1 className='dropdown-title'>
                        Add to playlist
                    </h1>
                    <ul className='dropdown-options-container'>
                        {data?.items.filter(item=>item.owner.id === user.id).map(item => {
                                return (
                                    <li
                                        onClick={() => { handleSelectOption(item.id, uri) }}
                                        key={item.id}
                                        className='dropdown-option'>
                                        {item.name}
                                    </li>
                                )
                            
                        })}
                    </ul>
                </>

            }

        </nav>
    )
}
