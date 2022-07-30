import './TrackCard.css';
import { FiHeart, FiClock } from 'react-icons/fi';


export const TrackCard = ({ header, number, url, name, author, album, time }) => {
    return (
        <div className={`track-card ${header&&'track-card-header'}`}>
            <div className='track-number'>
                {header ? '#' : number}
            </div>
            <div className='track-name'>
                {!header && <div className='track-img' />}
                <span className='track-info'>
                     {header ? 'TITLE' : <p className='track-info-name'>{name}</p>}
                    {!header && <p className='track-info-author'>{author}</p>}
                </span>
            </div>
            <div className='track-album'>
                {header ? 'ALBUM' : album}
            </div>
            <div className='track-save'>
                {!header && <FiHeart className='save-btn' />}
            </div>
            <div className='track-time'>
                {header ? <FiClock /> : time}
            </div>
        </div>
    )
}
