# typed: strict
# frozen_string_literal: true

module CssParser
  class << self
    # Don't mutate original rule sets when merging.
    module Patch
      extend T::Sig

      sig do
        params(rule_sets: T.any(RuleSet, T::Array[RuleSet])).returns(RuleSet)
      end
      def merge(*rule_sets)
        rule_sets = rule_sets.flatten.map do |rule_set|
          RuleSet.new(nil, rule_set.declarations_to_s, rule_set.specificity)
        end
        super(rule_sets)
      end
    end
    prepend Patch
  end
end
