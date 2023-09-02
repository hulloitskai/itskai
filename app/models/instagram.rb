# typed: strict
# frozen_string_literal: true

module Instagram
  # == Constants
  CREDENTIALS_DIR = T.let(Rails.root.join("tmp/instagram"), Pathname)
end
