// TypesFromSerializers CacheKey ce1a77b136a202a6390a906b50860fdd
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type RSpotifyAlbum from './Album'
import type RSpotifyArtist from './Artist'

export default interface RSpotifyTrack {
  id: string
  album: RSpotifyAlbum
  artists: RSpotifyArtist[]
  duration_ms: number
  name: string
  spotify_url: string
}
