# typed: true
# frozen_string_literal: true

module PoorlyDrawnLines
  class ComicsController < ApplicationController
    # == Filters
    before_action :set_comic

    # == Actions
    def show
      comic = T.must(@comic)
      render(json: JSON.pretty_generate(comic.to_h))
    end

    private

    # == Filter Handlers
    sig { void }
    def set_comic
      @comic = T.let(@comic, T.nilable(Comic))
      id = T.let(params.fetch(:id), String)
      response = Faraday.get("https://poorlydrawnlines.com/comic/#{id}/")
      if response.success?
        html = T.let(response.body, String)
        doc = T.let(Nokogiri::HTML(html), Nokogiri::HTML::Document)
        img = T.let(
          doc.at_css(".post img"),
          Nokogiri::XML::Node,
        )
        previous_link = T.let(
          doc.at_css(".post-nav .previous a"),
          Nokogiri::XML::Node,
        )
        next_link = T.let(doc.at_css(".post-nav .next a"), Nokogiri::XML::Node)
        @comic = Comic.new(
          id:,
          image_url: img["src"],
          previous_url: previous_link["href"],
          next_url: next_link["href"],
        )
        @comic.validate!
      else
        raise "Failed to load comic `#{id}': #{response.body}"
      end
    end
  end
end
