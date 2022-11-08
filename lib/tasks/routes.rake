# rubocop:disable Rails/RakeEnvironment
# frozen_string_literal: true

# TODO: Remove this task when the `annotate_models` gem supports Rails 7.
#
# See: https://github.com/ctran/annotate_models/pull/924
task :routes do
  system("bundle exec rails routes")
end
