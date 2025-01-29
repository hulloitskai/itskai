# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: alerts
#
#  id         :uuid             not null, primary key
#  body       :text             not null
#  title      :string           not null
#  created_at :datetime         not null
#
class AlertSerializer < ApplicationSerializer
  # == Attributes
  attributes :title, :body
end
