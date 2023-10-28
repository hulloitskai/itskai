# typed: strict
# frozen_string_literal: true

require "friendly_id"

module FriendlyId::Slugged
  # Custom slug normalization and conflict resolution.
  module Patch
    extend T::Sig
    extend T::Helpers

    # == Annotations
    requires_ancestor { FriendlyId::Base }
    requires_ancestor { FriendlyId::Slugged }

    # == Methods
    # Apply additional normalization.
    sig { params(value: T.untyped).returns(String) }
    def normalize_friendly_id(value)
      value = super
      value.tr!("_.", "-")
      value.gsub!(/-+\z/, "")
      value
    end

    # On conflict, use Nanoid to generate slug tails.
    sig { params(candidates: T::Enumerable[String]).returns(String) }
    def resolve_friendly_id_conflict(candidates)
      tail = Nanoid.generate(
        alphabet:
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        size: 10,
      )
      [apply_slug_limit(candidates.first, tail), tail]
        .compact
        .join(friendly_id_config.sequence_separator)
    end
  end
  prepend Patch
end
