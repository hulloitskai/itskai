# rubocop:disable Rails/RakeEnvironment, Layout/LineLength
# typed: false
# frozen_string_literal: true

return unless Rails.env.development?

require "annotate"

AnnotateModels.send(:remove_const, :MAGIC_COMMENT_MATCHER)
AnnotateModels::MAGIC_COMMENT_MATCHER = /(^#\s*encoding:.*(?:\n|r\n))|(^# coding:.*(?:\n|\r\n))|(^# -\*- coding:.*(?:\n|\r\n))|(^# -\*- encoding\s?:.*(?:\n|\r\n))|(^#\s*frozen_string_literal:.+(?:\n|\r\n))|(^# -\*- frozen_string_literal\s*:.+-\*-(?:\n|\r\n))|(^#\s*typed:.+(?:\n|\r\n))/

task :set_annotation_options do
  # You can override any of these by setting an environment variable of the
  # same name.
  Annotate.set_defaults(
    active_admin: false,
    additional_file_patterns: [],
    routes: false,
    models: true,
    position_in_routes: "after",
    position_in_class: "before",
    position_in_test: "after",
    position_in_fixture: "after",
    position_in_factory: "after",
    position_in_serializer: "after",
    show_foreign_keys: true,
    show_complete_foreign_keys: false,
    show_indexes: true,
    simple_indexes: false,
    model_dir: "app/models",
    root_dir: "",
    include_version: false,
    require: "",
    exclude_tests: true,
    exclude_fixtures: true,
    exclude_factories: true,
    exclude_serializers: true,
    exclude_scaffolds: true,
    exclude_controllers: true,
    exclude_helpers: true,
    exclude_sti_subclasses: false,
    ignore_model_sub_dir: false,
    ignore_columns: nil,
    ignore_unknown_models: false,
    hide_limit_column_types: "integer,bigint,boolean",
    hide_default_column_types: "json,jsonb,hstore",
    skip_on_db_migrate: false,
    format_bare: true,
    format_rdoc: false,
    format_yard: false,
    format_markdown: false,
    sort: false,
    force: false,
    frozen: false,
    classified_sort: true,
    trace: false,
    wrapper_open: "rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective\n#",
    wrapper_close: "rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective",
    with_comment: true,
  )
end

Annotate.load_tasks
