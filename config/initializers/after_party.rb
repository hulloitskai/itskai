# typed: strict
# frozen_string_literal: true

AfterParty.setup do |_config|
  # ==> ORM configuration
  # Load and configure the ORM. Supports :active_record (default) and
  # :mongoid (bson_ext recommended) by default. Other ORMs may be
  # available as additional gems.
  require "after_party/active_record.rb"
end
