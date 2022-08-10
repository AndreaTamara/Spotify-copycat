import './ViewMoreBtn.css'
import {RiArrowUpSLine,RiArrowDownSLine} from 'react-icons/ri'

export const ViewMoreBtn = ({ more, setMore }) => {
    return (
        <button
            className='view-more-btn'
            onClick={() => setMore(prev => !prev)}
        >
            {more ?
                <span className='view-more'>
                    <RiArrowUpSLine />
                    View less
                </span>
                :
                <span className='view-more'>
                    <RiArrowDownSLine />
                    View more
                </span>}

        </button>
    )
}
