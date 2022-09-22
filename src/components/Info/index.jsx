import './Info.css'
import {FiAlertCircle} from 'react-icons/fi';

export const Info = ({msn='No results found'}) => {
    return (
        <div className='info-container' >
            <FiAlertCircle />
            <p>{msn}</p>
        </div>
    )
}
