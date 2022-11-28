# typed: true
# frozen_string_literal: true

module Premailer::Rails::CSSLoaders::NetworkLoader
  extend T::Helpers

  requires_ancestor { Kernel }

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

  def base_url
    Premailer::Rails.config[:base_url]
  end
end
