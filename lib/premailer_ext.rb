# typed: strict
# frozen_string_literal: true

require "premailer"
require "premailer/rails"

module Premailer::Rails::CSSLoaders::NetworkLoader
  extend T::Sig
  extend T::Helpers

  # == Annotations
  requires_ancestor { Kernel }

  # == Methods
  sig { params(url: String).returns(T.nilable(URI::Generic)) }
  def uri_for_url(url)
    uri = URI(url)
    if uri.host.present?
      return uri if uri.scheme.present?
      URI("http:#{uri}")
    elsif asset_host_present?
      scheme, host = asset_host(url).split(%r{:?//})
      scheme, host = host, scheme if host.nil?
      scheme = "http" if scheme.blank?
      path = url
      URI(File.join("#{scheme}://#{host}", path))
    elsif base_url.present?
      scheme, host = base_url.split(%r{:?//})
      scheme, host = host, scheme if host.nil?
      scheme = "http" if scheme.blank?
      path = url
      URI(File.join("#{scheme}://#{host}", path))
    end
  end

  sig { returns(String) }
  def base_url
    Premailer::Rails.config[:base_url]
  end
end
