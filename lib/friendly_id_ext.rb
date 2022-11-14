# typed: strict
# frozen_string_literal: true

# # TODO: Correct badly shortened slugs. Submit a PR to FriendlyId?
# module FriendlyId::Slugged
#   extend T::Sig
#   extend T::Helpers

#   abstract!
#   requires_ancestor { Kernel }

#   sig { abstract.returns(FriendlyId::Slugged::Configuration) }
#   def friendly_id_config; end

#   sig { params(value: T.untyped).returns(String) }
#   def normalize_friendly_id(value)
#     config = friendly_id_config
#     value = T.let(value.to_s.parameterize, String)
#     value = T.must(value[0...config.slug_limit]) if config.slug_limit
#     value.tr!("_.", "-")
#     value.gsub!(/-+\z/, "")
#     value
#   end

#   # On conflict, use nanoid to generate slug tails.
#   sig { params(candidates: T::Enumerable[String]).returns(String) }
#   def resolve_friendly_id_conflict(candidates)
#     config = friendly_id_config
#     tail =
#       Nanoid.generate(
#         size: 10,
#         alphabet:
#           "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
#       )
#     [apply_slug_limit(candidates.first, tail), tail].compact.join(
#       config.sequence_separator,
#     )
#   end
# end
