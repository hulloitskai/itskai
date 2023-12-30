# typed: strict
# frozen_string_literal: true

module Types
  class FileType < BaseObject
    # == Interfaces
    implements NodeType
    implements UploadType
  end
end
