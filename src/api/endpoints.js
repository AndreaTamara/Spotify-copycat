//home
export const newRealeasesUrl = '/browse/new-releases';
export const featuredPlaylistsUrl = '/browse/featured-playlists';
export const browseUrl = '/browse/categories';
export const userPlaylistUrl = '/me/playlists';
export const userTopArtistsUrl = '/me/top/artists'
export const userTopTracksUrl = '/me/top/tracks'
//playlists related
export const itemsPlaylistUrl = (id)=> `/playlists/${id}/tracks`;
export const playlistUrl = (id)=> `/playlists/${id}`;
//tracks related
export const tracksUrl = (id)=> `/tracks/?ids=${id.map(id=>id).join(',')}`;//several tracks
export const trackUrl = (id)=> `/tracks/${id}`;// un track
//albums related
export const itemsAlbumUrl = (id)=> `/albums/${id}/tracks`;
export const albumUrl = (id)=> `/albums/${id}`;
//artists related
export const topTracksArtistUrl = (id,market)=> `/artists/${id}/top-tracks?market=${market}`;
export const artistUrl = (id)=> `/artists/${id}`;
export const albumsArtistUrl = (id)=> `/artists/${id}/albums?include_groups=album,single`;
export const artistsRelatedUrl = (id)=> `/artists/${id}/related-artists`;