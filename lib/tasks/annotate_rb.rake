# rubocop:disable Layout/LineLength
# typed: true
# frozen_string_literal: true

# This rake task was added by annotate_rb gem.

# Can set `ANNOTATERB_SKIP_ON_DB_TASKS` to be anything to skip this
if Rails.env.development? && ENV["ANNOTATERB_SKIP_ON_DB_TASKS"].nil?
  require "annotate_rb"

  AnnotateRb::RouteAnnotator::Helper.send(:remove_const, :MAGIC_COMMENT_MATCHER)
  AnnotateRb::RouteAnnotator::Helper::MAGIC_COMMENT_MATCHER = /(^#\s*encoding:.*(?:\n|r\n))|(^# coding:.*(?:\n|\r\n))|(^# -\*- coding:.*(?:\n|\r\n))|(^# -\*- encoding\s?:.*(?:\n|\r\n))|(^#\s*frozen_string_literal:.+(?:\n|\r\n))|(^# -\*- frozen_string_literal\s*:.+-\*-(?:\n|\r\n))|(^#\s*typed:.+(?:\n|\r\n))/

  AnnotateRb::Core.load_rake_tasks
end
