import { SearchTab } from '../SearchTab';
import { MdClose } from 'react-icons/md'
import './AddSongs.css'
import { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useGetData } from '../../hooks/useGetData';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { searchTrackUrl } from '../../api/endpoints';
import { DetailTrackList } from '../DetailTracksList';
import { cutTextString } from '../../helpers/cutTextString';
import { TrackCard } from '../TrackCard';
import { Loader } from '../Loader';
import { Info } from '../Info';

export const AddSongs = ({ handleClose,onAddSong }) => {
    const navigate = useNavigate()
    const { logged, user } = useSelector(state => state.log)
    const [searchedSong, setSearchedSong] = useState('')
    const { debouncedValue, setDebouncedValue } = useDebounce(searchedSong, 900);
    const { data, loading, error } = useGetData(searchTrackUrl(debouncedValue), logged, false,null, true)

    const handleSearch = (e) => {
        e.preventDefault()
        setDebouncedValue(searchedSong)
      }
      
    return (
        <div className='add-songs-container'>
            <header className='add-songs-header'>
                <h1>Let´s find new songs for you!</h1>
                <button className='add-songs-close-btn' onClick={() => handleClose(false)}><MdClose /></button>
            </header>

            <SearchTab
                searchedSong={searchedSong}
                setSearchedSong={setSearchedSong}
                onSubmit={handleSearch}
                deleteSearch={()=>setDebouncedValue(null)}
                addSongsView={true}
            />
            {(debouncedValue && loading) && <Loader height='10rem'/>}
            {error && <Info msn={`Error ${error?.status}: ${error?.message}`}/>}
            {data &&
                <DetailTrackList addSongsView={true}>
                    {(data.tracks.items.length === 0) && <Info />}
                    {data.tracks.items?.map((track, i) => {
                        return (
                            <TrackCard
                                onAddSong={onAddSong}
                                key={track.id}
                                id={track.id}
                                uri={track.uri}
                                addSongsView={true}
                                name={cutTextString(track.name, 25)}
                                author={track.artists.map(artist => {
                                    return { name: artist.name, id: artist.id }
                                })}
                                album={cutTextString(track.album.name, 25)}
                                url={track.album.images[0]?.url}
                                albumId={track.album.id}
                            />
                        )
                    })}
                    <hr />
                </DetailTrackList>
            }
        </div>
    )
}
