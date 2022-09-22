# typed: strict
# frozen_string_literal: true

require "responders_ext"

class ApplicationResponder < ActionController::Responder
  extend T::Sig

  # == Responders ==
  include Responders::FlashResponder

  # Redirects resources to the collection path (index action) instead
  # of the resource path (show action) for POST/PUT/DELETE requests.
  # include Responders::CollectionResponder
end
