# rubocop:disable Layout/LineLength
# typed: true
# frozen_string_literal: true

require "annotate"

module AnnotateModels
  remove_const(:PREFIX)
  remove_const(:MAGIC_COMMENT_MATCHER)

  PREFIX = "== Schema information"
  MAGIC_COMMENT_MATCHER = /(^#\s*encoding:.*(?:\n|r\n))|(^# coding:.*(?:\n|\r\n))|(^# typed:.*(?:\n|\r\n))|(^# -\*- coding:.*(?:\n|\r\n))|(^# -\*- encoding\s?:.*(?:\n|\r\n))|(^#\s*frozen_string_literal:.+(?:\n|\r\n))|(^# -\*- frozen_string_literal\s*:.+-\*-(?:\n|\r\n))/
end
