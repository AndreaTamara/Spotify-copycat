import { TrackCard } from '../TrackCard'
import './DetailTrackList.css'

export const DetailTrackList = ({ children,albumView }) => {
    return (
        <section className='tracks-list'>
            <TrackCard
                header={true} 
                albumView={albumView}
            />
            {children}
        </section>
    )
}
