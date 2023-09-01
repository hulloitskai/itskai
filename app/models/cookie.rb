# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: cookies
#
#  id              :uuid             not null, primary key
#  domain          :string           not null
#  expiration_date :float
#  host_only       :boolean          not null
#  http_only       :boolean          not null
#  name            :string           not null
#  path            :string           not null
#  same_site       :string           not null
#  secure          :boolean          not null
#  service         :string           not null
#  session         :boolean          not null
#  value           :string           not null
#  created_at      :datetime         not null
#
# Indexes
#
#  index_cookies_on_service  (service)
#
class Cookie < ApplicationRecord
  include Identifiable

  # == Attributes
  enumerize :service, in: %i[instagram]
end
