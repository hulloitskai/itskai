# typed: strict
# frozen_string_literal: true

require "rails"

module Spotify
  class Railtie < Rails::Railtie
    config.spotify = ActiveSupport::OrderedOptions.new

    initializer "spotify.set_configs" do |app|
      options = app.config.spotify
      options.logger = Rails.logger

      ActiveSupport.on_load(:spotify) do
        T.bind(self, T.class_of(Spotify))
        options.each do |k, v|
          k = "#{k}="
          if respond_to?(k)
            send(k, v)
          else
            raise "Invalid option key: #{k}"
          end
        end
      end
    end

    initializer "spotify.initialize" do
      config.after_initialize do
        if Rails.const_defined?(:Server)
          puts "=> Initializing Spotify" # rubocop:disable Rails/Output
          Spotify.initialize!(stream: Rails.env.production?)
        elsif Rails.const_defined?(:Console)
          Spotify.initialize!
        end
      end
    end
  end
end
