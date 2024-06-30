# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
#
# == Schema Information
#
# Table name: constellations_posts
#
#  id                  :uuid             not null, primary key
#  body                :text             not null
#  themes              :string           is an Array
#  themes_generated_at :datetime
#  title               :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#
# Indexes
#
#  index_constellations_posts_on_themes  (themes)
#
# rubocop:enable Layout/LineLength
class Constellations::Post < ApplicationRecord
end
