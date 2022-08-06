import { TrackCard } from '../TrackCard'
import './DetailTrackList.css'

export const DetailTrackList = ({ children,albumView,artistView,searchView }) => {
    return (
        <section className={`tracks-list ${artistView&&'tracks-list-artistView'}`}>
            {artistView||searchView?
            <h1 className='artistView-title'>{artistView?'Top tracks':'Tracks'}</h1>
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
