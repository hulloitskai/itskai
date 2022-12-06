# typed: strict
# frozen_string_literal: true

ENV["RAILS_LOG_LEVEL"].presence.try! do |level|
  Rails.logger.level = level.to_sym
end
