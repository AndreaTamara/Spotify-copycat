import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { albumsArtistUrl, artistsRelatedUrl, artistUrl, topTracksArtistUrl } from '../../api/endpoints'
import { Card } from '../../components/Card'
import { DetailHeader } from '../../components/DetailHeader'
import { DetailTrackList } from '../../components/DetailTracksList'
import { DetailViewCommandBar } from '../../components/DetailViewCommandBar'
import { DetailViewContainer } from '../../components/DetailViewContainer'
import { RowList } from '../../components/RowList'
import { TrackCard } from '../../components/TrackCard'
import { authContext } from '../../context/authContext'
import { convertMstoMin } from '../../helpers/convertToMin'
import { cutTextString } from '../../helpers/cutTextString'
import { formatNum } from '../../helpers/formatNum'
import { useGetData } from '../../hooks/useGetData'
import './Artist.css'

export const Artist = () => {

    const { loggedIn, user } = useContext(authContext);
    const { artistId } = useParams()
    const { data: topTracks, loading: topTracksLoading, error: topTracksError } = useGetData(topTracksArtistUrl(artistId, user.country||'US'), loggedIn, false)
    const { data: artist, loading: artistLoading, error: artistError } = useGetData(artistUrl(artistId), loggedIn, false)
    const { data: albumsArtist, loading: albumsArtistLoading, error: albumsArtistError } = useGetData(albumsArtistUrl(artistId), loggedIn, false)
    const { data: artistsRelated, loading: artistsRelatedLoading, error: artistsRelatedError } = useGetData(artistsRelatedUrl(artistId), loggedIn, false)

   
    
    return (
        <DetailViewContainer>
            <img className='hero-artist-img' src={artist?.images[0].url} alt='artist' />
            <DetailHeader
                type='verified artist'
                name={artist?.name}
                artistView={true}
                tracks={artist?formatNum(artist.followers.total):''}
            />
            <DetailViewCommandBar artistView={true} />
            <DetailTrackList artistView={true}>
                {topTracksLoading && <p>loading...</p>}
                {topTracksError && <p>ocurrió un error: {topTracksError.error?.message}</p>}
                {topTracks?.tracks.map((track, i) => {
                    return (
                        <TrackCard
                            key={track.id}
                            number={i + 1}
                            name={cutTextString(track.name, 25)}
                            time={convertMstoMin(track.duration_ms)}
                            url={track.album.images[0].url}
                        />
                    )
                })}
            </DetailTrackList>
            <RowList title='Discography' id={'artist-discography'+artistId} artistView={true}>
                {artistsRelatedLoading && <p>loading...</p>}
                {albumsArtistError && <p>ocurrió un error: {albumsArtistError.error?.message}</p>}
                {albumsArtist?.items.map(item => {
                    return (
                        <Link  to={'/album/' + item.id} key={item.id}>
                            <Card
                                name={cutTextString(item.name, 30)}
                                author={cutTextString(item.album_type, 30)}
                                imgUrl={item.images[0].url}
                            />
                        </Link>
                    )
                })}
            </RowList>
            <RowList title='Related artist' id={'related-artist'+artistId} artistView={true}>
                {albumsArtistLoading && <p>loading...</p>}
                {artistsRelatedError && <p>ocurrió un error: {artistsRelatedError.error?.message}</p>}
                {artistsRelated?.artists.map(artist => {
                    return (
                        <Link to={'/artist/' + artist.id} key={artist.id} >
                            <Card
                                type='artist'
                                name={cutTextString(artist.name, 30)}
                                author={cutTextString(artist.type, 30)}
                                imgUrl={artist.images[0]?.url}
                            />
                        </Link>
                    )
                })}
            </RowList>
        </DetailViewContainer>



    )
}
