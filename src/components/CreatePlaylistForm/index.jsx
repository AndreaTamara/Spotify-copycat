import './CreatePlaylistForm.css'
import { MdClose } from 'react-icons/md'
export const CreatePlaylistForm = ({ setOpenModal }) => {
    return (
        <form className='create-playlist-container'>
            <div className='create-playlist-header'>
                <h1 className='create-playlist-title'>Create a playlist</h1>
                <button
                    className='create-playlist-close-btn'
                    onClick={() => setOpenModal(false)}>
                    <MdClose />
                </button>
            </div>

            <input
                className='create-playlist-input input-name'
                type='text'
                // name='playlistName'
                // value={'algo'}
                // onChange={'algo'}
                required
                placeholder='Add a name'
            />
    
            <textarea
                className='create-playlist-input input-description'
                placeholder='Add an optional description'
                // name='playlistDescription'
            // value={'algo'}
            // onChange={'algo'}
            />
            <button
                className='add-songs-btn create-playlist-btn'
                type='button'
            // onClick={onSavePlaylist}
            // disabled={!canSave}
            >
                Save
            </button>
        </form>
    )
}
