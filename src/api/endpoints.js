export const newRealeasesUrl = '/browse/new-releases';
export const featuredPlaylistsUrl = '/browse/featured-playlists';
export const browseUrl = '/browse/categories';
export const userPlaylistUrl = '/me/playlists';
// export const userTopArtistUrl = (type)=> {`/me/top/${type}`}
export const userTopArtistsUrl = '/me/top/artists'
export const userTopTracksUrl = '/me/top/tracks'
export const itemsPlaylistUrl = (id)=> `/playlists/${id}/tracks`;
export const PlaylistUrl = (id)=> `/playlists/${id}`;
export const tracksUrl = (id)=> `/tracks/?ids=${id.map(id=>id).join(',')}`;
export const trackUrl = (id)=> `/tracks/${id}`;
export const itemsAlbumUrl = (id)=> `/albums/${id}/tracks`;