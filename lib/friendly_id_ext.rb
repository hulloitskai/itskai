# typed: true
# frozen_string_literal: true

require "friendly_id"

module FriendlyId::Slugged
  # Custom slug normalization.
  module CustomNormalization
    extend T::Sig
    extend T::Helpers

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
  end
  prepend CustomNormalization

  # On conflict, use Nanoid to generate slug tails.
  module ResolveConflictWithNanoid
    extend T::Sig
    extend T::Helpers

    requires_ancestor { FriendlyId::Base }
    requires_ancestor { FriendlyId::Slugged }

    sig { params(candidates: T::Enumerable[String]).returns(String) }
    def resolve_friendly_id_conflict(candidates)
      tail = SecureRandom.base58(10)
      [apply_slug_limit(candidates.first, tail), tail]
        .compact
        .join(friendly_id_config.sequence_separator)
    end
  end
  prepend ResolveConflictWithNanoid
end
