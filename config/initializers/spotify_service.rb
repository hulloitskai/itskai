# typed: strict
# frozen_string_literal: true

# Rails.application.configure do
#   config.after_initialize do
#     client_id = ENV["SPOTIFY_CLIENT_ID"]
#     client_secret = ENV["SPOTIFY_CLIENT_SECRET"]
#     refresh_token = ENV["SPOTIFY_REFRESH_TOKEN"]
#     if client_id.present? && client_secret.present? && refresh_token.present?
#       puts "=> Initializing Spotify service"
#       SpotifyService.initialize(
#         client_id: client_id,
#         client_secret: client_secret,
#         refresh_token: refresh_token,
#       )
#     end
#   end
# end if Rails.const_defined?(:Server)
