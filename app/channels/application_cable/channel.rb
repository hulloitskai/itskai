# typed: strict
# frozen_string_literal: true

module ApplicationCable
  class Channel < ActionCable::Channel::Base
    extend T::Sig
    extend T::Helpers
  end
end
