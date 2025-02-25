# typed: true
# frozen_string_literal: true

require "css_parser"

module CssParser
  class << self
    # Don't mutate original rule sets when merging.
    module MergeWithoutMutatingRuleSets
      extend T::Sig

      sig do
        params(rule_sets: T.any(RuleSet, T::Array[RuleSet])).returns(RuleSet)
      end
      def merge(*rule_sets)
        rule_sets = rule_sets.flatten.map do |rule_set|
          RuleSet.new(
            block: rule_set.declarations_to_s,
            specificity: rule_set.specificity,
          )
        end
        super(rule_sets)
      end
    end
    prepend MergeWithoutMutatingRuleSets
  end
end
