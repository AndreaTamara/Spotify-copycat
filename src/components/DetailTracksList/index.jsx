import { TrackCard } from '../TrackCard'
import './DetailTrackList.css'

export const DetailTrackList = ({ children,albumView,artistView,searchView,savedView }) => {

    return (
        <section className={`tracks-list ${artistView&&'tracks-list-artistView'} ${searchView&&'tracks-list-searchView'}`}>
            {(artistView||searchView)&&
            <h1 className='artistView-title'>{artistView?'Top tracks':'Tracks'}</h1>
            }
            { !artistView&&
             <TrackCard
                header={true} 
                albumView={albumView}
                savedView={savedView}
            />}
            {children}
        </section>
    )
}
