import './SearchTab.css'
import { useSearchParams } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';
import { RiCloseFill } from 'react-icons/ri'


export const SearchTab = ({ onSubmit, deleteSearch, addSongsView, searchedSong, setSearchedSong }) => {

    const [searchParams, setSearchParams] = useSearchParams()

    const searchedQuery = !addSongsView ? (searchParams.get('query') || '') : searchedSong


    const handleInputChange = (e) => {
        e.preventDefault()
        const searched = e.target.value.toLowerCase()
        if (searched) {
            addSongsView ?
                setSearchedSong(searched)
                :
                setSearchParams({ query: searched })
        }
        else {
            addSongsView ?
                setSearchedSong('')
                :
                setSearchParams({ query: '' })
        }
    }

    const handleDelete = () => {
        if (addSongsView) {
            setSearchedSong('')
            deleteSearch()
        }
        else {
            setSearchParams({ query: '' })
            deleteSearch()
        }
    }

    return (

        <form className='search-tab-container'
            onSubmit={(e) => onSubmit(e)}
        >
            <div className='input-icon-container'>
                <input
                    type='text'
                    className='search-input'
                    placeholder='Type here...'
                    value={searchedQuery}
                    onChange={handleInputChange}
                />
                <RiCloseFill
                    className={`del-search-icon ${searchedQuery ? 'visible' : ''}`}
                    onClick={handleDelete} />

                <HiSearch className='search-icon' />

            </div>
        </form>
    )
}
