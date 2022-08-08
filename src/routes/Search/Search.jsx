import { useContext, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { searchUrl } from "../../api/endpoints";
import { BrowserView } from "../../components/BrowserView";
import { Card } from "../../components/Card";
import { ColorCard } from "../../components/ColorCard";
import { DetailTrackList } from "../../components/DetailTracksList";
import { DetailViewContainer } from "../../components/DetailViewContainer"
import { GridContainer } from "../../components/GridContainer";
import { RowList } from "../../components/RowList";
import { SearchTab } from "../../components/SearchTab"
import { TrackCard } from "../../components/TrackCard";
import { authContext } from "../../context/authContext";
import { convertMstoMin } from "../../helpers/convertToMin";
import { cutTextString } from "../../helpers/cutTextString";
import { useGetData } from "../../hooks/useGetData";



export const Search = () => {
  const navigate = useNavigate()
  const { loggedIn, user } = useContext(authContext)
  // const [searchParams] = useSearchParams(useLocation().query);
  // const searchedQuery = searchParams.get('query')
  const [searchedQuery, setSearchedQuery] = useState(null)

  console.log('en search component ' + searchedQuery)

  const { data, loading, error } = useGetData(searchUrl(searchedQuery), loggedIn, false)


  const handleSearch = (e) => {
    e.preventDefault()
    const query = new URLSearchParams(window.location.search).get('query')
    setSearchedQuery(query)
  }

  const deleteSearch = () => {
    setSearchedQuery(null)
    navigate('/search')

  }

  return (
    <>
      <SearchTab onSubmit={handleSearch} deleteSearch={deleteSearch} />
      <DetailViewContainer>
        <section className="search-scroll-container" style={{ width: '100%', marginTop: '5rem' }}>
          {searchedQuery && data ?
            <>
              <DetailTrackList searchView={true}>
                {data.tracks.items?.map((track, i) => {
                  return (
                    <TrackCard
                      key={track.id}
                      number={i + 1}
                      name={cutTextString(track.name, 25)}
                      author={track.artists.map(artist => {
                        return { name: artist.name, id: artist.id }
                      })}
                      album={cutTextString(track.album.name, 25)}
                      url={track.album.images[0].url}
                      time={convertMstoMin(track.duration_ms)}
                      albumId={track.album.id}
                    />
                  )
                })}
              </DetailTrackList>
              <RowList title='Artists' id='result-artists' artistView={true}>
                {data.artists.items?.map(artist => {
                  return (
                    <Link to={'/artist/' + artist.id} key={artist.id}>
                      <Card
                        type='artist'
                        name={cutTextString(artist.name, 30)}
                        author={artist.type}
                        imgUrl={artist.images[0]?.url}
                      />
                    </Link>
                  )
                })}
              </RowList>
              <RowList title='Playlist' id='result-playlist' artistView={true}>

                {data.playlists.items?.map(playlist => {
                  return (
                    <Link to={'/playlist/' + playlist.id} key={playlist.id}>
                      <Card
                        name={cutTextString(playlist.name, 30)}
                        author={cutTextString(playlist.owner.display_name, 45)}
                        imgUrl={playlist.images[0].url}
                      />
                    </Link>
                  )
                })}
              </RowList>
              <RowList title='Albums' id='result-albums' artistView={true}>
                {data.albums.items?.map(album => {
                  return (
                    <Link to={'/album/' + album.id} key={album.id}>
                      <Card
                        name={cutTextString(album.name, 30)}
                        author={cutTextString(album.artists.map(artist => artist.name).join(', '), 30)}
                        imgUrl={album.images[0].url}
                      />
                    </Link>
                  )
                })}
              </RowList>
            </>
            :
            <BrowserView/>
          }
        </section>
      </DetailViewContainer>
    </>
  )
}
