import './NoInfo.css'
import {FiAlertCircle} from 'react-icons/fi'

export const NoInfo = ({msn='No results found'}) => {
    return (
        <div className='noinfo-container' >
            <FiAlertCircle />
            <p>{msn}</p>
        </div>
    )
}
