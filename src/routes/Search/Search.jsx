import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchUrl } from "../../api/endpoints";
import { BrowserView } from "../../components/BrowserView";
import { Card } from "../../components/Card";
import { DetailTrackList } from "../../components/DetailTracksList";
import { DetailViewContainer } from "../../components/DetailViewContainer"
import { RowList } from "../../components/RowList";
import { SearchTab } from "../../components/SearchTab"
import { TrackCard } from "../../components/TrackCard";
import { ViewMoreBtn } from "../../components/ViewMoreBtn";
import { useSelector } from 'react-redux'
import { convertMstoMin } from "../../helpers/convertToMin";
import { cutTextString } from "../../helpers/cutTextString";
import { useDebounce } from "../../hooks/useDebounce";
import { useGetData } from "../../hooks/useGetData";




export const Search = () => {
  const navigate = useNavigate()
  const { logged, user } = useSelector(state=>state.log)
  const searchedQuery = new URLSearchParams(window.location.search).get('query')
  const { debouncedValue, setDebouncedValue } = useDebounce(searchedQuery, 900);
  const { data, loading, error } = useGetData(searchUrl(debouncedValue), logged, false, true)
  const [more, setMore] = useState(false)

  const dataLength =
    data?.tracks.items.length+
    data?.artists.items.length+
    data?.playlists.items.length+
    data?.albums.items.length

  const handleSearch = (e) => {
    e.preventDefault()
    const query = new URLSearchParams(window.location.search).get('query')
    setDebouncedValue(query)
  }

  const deleteSearch = () => {
    const query = new URLSearchParams(window.location.search)
    query.set('query', '')
    setDebouncedValue(null)
    navigate('/search')
    setMore(false)
  }

  useEffect(() => {
    setMore(false)
  }, [debouncedValue])


  return (
    <>
      <SearchTab deleteSearch={deleteSearch} onSubmit={handleSearch} />
      <DetailViewContainer>
        <section className="search-scroll-container" style={{ width: '100%', marginTop: '5rem' }}>
          {(debouncedValue && loading) && <p>loading...</p>}
          {error && <p>ocurrió un error: {error.error?.message}</p>}
          { dataLength===0&&<p>No results found</p>}
          {(data&&(dataLength!==0)) &&
            <>
              <DetailTrackList searchView={true}>
                {(data.tracks.items.length===0)&& <p>No results found</p>}
                {data.tracks.items?.map((track, i) => {
                  return (
                    <TrackCard
                      hidden={(i > 4 && !more) ? 'hidden' : ''}
                      key={track.id}
                      id={track.id}
                      uri={track.uri}
                      number={i + 1}
                      name={cutTextString(track.name, 25)}
                      author={track.artists.map(artist => {
                        return { name: artist.name, id: artist.id }
                      })}
                      album={cutTextString(track.album.name, 25)}
                      url={track.album.images[0]?.url}
                      time={convertMstoMin(track.duration_ms)}
                      albumId={track.album.id}
                    />
                  )
                })}
                {(data.tracks.items.length>5)&&
                  <ViewMoreBtn more={more} setMore={setMore}/>
                }
                
              </DetailTrackList>
              <RowList title='Artists' id='result-artists' artistView={true}>
                {(data.artists.items.length===0)&& <p>No results found</p>}
                {data.artists.items?.map(artist => {
                  return (
                      <Card
                        key={artist.id}
                        path={'/artist/' + artist.id} 
                        uri={artist.uri}
                        type='artist'
                        name={cutTextString(artist.name, 30)}
                        author={artist.type}
                        imgUrl={artist.images[0]?.url}
                      />
                  )
                })}
              </RowList>
              <RowList title='Playlist' id='result-playlist' artistView={true}>
              {(data.playlists.items.length===0)&& <p>No results found</p>}
                {data.playlists.items?.map(playlist => {
                  return (
                      <Card
                        key={playlist.id}
                        path={'/playlist/' + playlist.id}
                        uri={playlist.uri}
                        name={cutTextString(playlist.name, 30)}
                        author={cutTextString(playlist.owner.display_name, 45)}
                        imgUrl={playlist.images[0]?.url}
                      />
                  )
                })}
              </RowList>
              <RowList title='Albums' id='result-albums' artistView={true}>
              {(data.albums.items.length===0)&& <p>No results found</p>}
                {data.albums.items?.map(album => {
                  return (
                      <Card
                        key={album.id}
                        path={'/album/' + album.id}
                        uri={album.uri}
                        name={cutTextString(album.name, 30)}
                        author={cutTextString(album.artists.map(artist => artist.name).join(', '), 30)}
                        imgUrl={album.images[0]?.url}
                      />
                  )
                })}
              </RowList>
            </>}
          {!searchedQuery && <BrowserView />}
        </section>
      </DetailViewContainer>
    </>
  )
}
