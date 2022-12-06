# typed: strict
# frozen_string_literal: true

module Sources
  class BaseSource < GraphQL::Dataloader::Source
    extend T::Sig
    extend T::Helpers
  end
end
