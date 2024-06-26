// TypesFromSerializers CacheKey b91c567bdef92c9924fa90f5f4990c57
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type RSpotifyAlbum from './Album'
import type RSpotifyArtist from './Artist'

export default interface RSpotifyTrack {
  id: string
  album: RSpotifyAlbum
  artists: RSpotifyArtist[]
  durationMs: number
  name: string
  spotifyUrl: string
}
