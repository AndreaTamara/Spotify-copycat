import './SearchTab.css'
import { useSearchParams } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';
import { RiCloseFill } from 'react-icons/ri'


export const SearchTab = ({ onSubmit, deleteSearch }) => {

    const [searchParams, setSearchParams] = useSearchParams()

    const searchedQuery = searchParams.get('query') || ''

    // console.log(searchedQuery)

    const handleInputChange = (e) => {
        e.preventDefault()
        const searched = e.target.value.toLowerCase()
        if (searched) { setSearchParams({ query: searched }) }
        else { setSearchParams({ query: '' }) }
    }

    const handleDelete = () => {
        setSearchParams({ query: '' })
        deleteSearch()
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
