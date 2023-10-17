# typed: strict
# frozen_string_literal: true

class QueryManager
  module ParsedDefinition
    extend T::Sig
    extend T::Helpers

    # == Annotations
    interface!

    # == Interface
    sig { abstract.returns(T::Set[String]) }
    def fragment_references; end
  end
end
