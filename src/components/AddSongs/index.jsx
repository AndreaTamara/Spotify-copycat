import { SearchTab } from '../SearchTab';
import {MdClose} from 'react-icons/md'
import './AddSongs.css'

export const AddSongs = ({handleClose}) => {
    return (
        <div className='add-songs-container'>
            <header className='add-songs-header'>
                <h1>Let´s find new songs for you!</h1>
                <button className='add-songs-close-btn' onClick={()=>handleClose(false)}><MdClose/></button>
            </header>

            <SearchTab
                onSubmit={() => console.log('submit')}
                deleteSearch={() => console.log('efectos secundarios delete')}
                addSongsView={true}
            />
        </div>
    )
}
