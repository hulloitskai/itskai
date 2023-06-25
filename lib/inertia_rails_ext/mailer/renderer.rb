# typed: true
# frozen_string_literal: true

module InertiaRails
  module Mailer
    class Renderer < ::InertiaRails::Renderer
      attr_reader :props
    end
  end
end
