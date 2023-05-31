# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: cookies
#
#  id              :uuid             not null, primary key
#  domain          :string           not null
#  expiration_date :integer
#  host_only       :boolean          not null
#  http_only       :boolean          not null
#  name            :string           not null
#  path            :string           not null
#  same_site       :string           not null
#  secure          :boolean          not null
#  session         :boolean          not null
#  value           :string           not null
#  created_at      :datetime         not null
#
# Indexes
#
#  index_cookies_on_domain  (domain)
#
class Cookie < ApplicationRecord
  include Identifiable
end
