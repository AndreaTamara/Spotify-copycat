import { TrackCard } from '../TrackCard'
import './DetailTrackList.css'

export const DetailTrackList = ({ children,albumView,artistView }) => {
    return (
        <section className={`tracks-list ${artistView&&'tracks-list-artistView'}`}>
            {artistView?
            <h1 className='artistView-title'>Top tracks</h1>
            :
             <TrackCard
                header={true} 
                albumView={albumView}
            />
            }
            {children}
        </section>
    )
}
