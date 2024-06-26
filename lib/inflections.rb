# typed: true
# frozen_string_literal: true

require "rails"

# Be sure to restart your server when you modify this file.

# Add new inflection rules using the following format. Inflections
# are locale specific, and you may define rules for as many different
# locales as you wish. All of these examples are active by default:
# ActiveSupport::Inflector.inflections(:en) do |inflect|
#   inflect.plural /^(ox)$/i, "\\1en"
#   inflect.singular /^(ox)en/i, "\\1"
#   inflect.irregular "person", "people"
#   inflect.uncountable %w( fish sheep )
# end

ActiveSupport::Inflector.inflections(:en) do |inflect|
  # == Global
  inflect.acronym("GlobalID")
  inflect.acronym("GraphQL")
  inflect.acronym("OAuth")
  inflect.acronym("RSpotify")
  inflect.uncountable("OAuthCredentials")
  inflect.uncountable("ICloudCredentials")

  # == Application
  inflect.acronym("ICloud")
  inflect.acronym("ICloudctl")
  inflect.acronym("ItsKai")
  inflect.acronym("PoorlyDrawnLines")
end
