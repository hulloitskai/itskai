# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: icloud_credentials
#
#  id         :uuid             not null, primary key
#  cookies    :text
#  email      :string           not null
#  password   :string           not null
#  session    :jsonb
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ICloudCredentialsSerializer < ApplicationSerializer
  # == Configuration
  object_as :credentials, model: "ICloudCredentials"

  # == Attributes
  attributes :email, :cookies, :session
end
