import './TrackCard.css';
import { FiHeart, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BsPlayFill } from 'react-icons/bs';
import { useContext } from 'react'
import { playContext } from '../../context/playContext';
import { authContext } from '../../context/authContext'


export const TrackCard = ({ header, number, url, name, author, album, time, albumView, albumId, hidden, uri }) => {

    const { currentUri,setCurrentUri } = useContext(playContext)
    const { loggedIn } = useContext(authContext)

    const handlePlay = (uri) => {
        console.log('inicio play:'+uri)
        if (uri && loggedIn) setCurrentUri(uri)
      }

    return (
        <div
            className={`track-card ${header && 'track-card-header'} ${albumView && 'track-card-album'} ${hidden || ''}`}>
            <div 
                className={`track-number ${currentUri===uri&&'play-icon-active'}`}>
                <span className='number-of-track'>{header ? '#' : number}</span>
                {!header && 
                <span
                    onClick={() => handlePlay(uri)}
                    className='play-icon'>
                    <BsPlayFill />
                </span>}
            </div>
            <div className='track-name'>
                {(!header && !albumView) && <img className='track-img' src={url} alt='album cover' />}
                <span className='track-info'>
                    {header ? 'TITLE' : <p className='track-info-name'>{name}</p>}
                    {!header &&
                        <p className='track-info-author'>
                            {author?.map((e, i) =>
                                <Link key={e.id} to={'/artist/' + e.id}>
                                    {`${e.name}${(i + 1) === author.length ? '' : ','}`}
                                </Link>)}
                        </p>
                    }
                </span>
            </div>
            {!albumView &&
                <div className='track-album'>
                    {header ? 'ALBUM' : <Link to={'/album/' + albumId}>{album}</Link>}
                </div>
            }
            <div className='track-save'>
                {!header && <FiHeart className='save-btn' />}
            </div>
            <div className='track-time'>
                {header ? <FiClock /> : time}
            </div>
        </div>
    )
}
