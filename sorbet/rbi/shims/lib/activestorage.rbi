# typed: strong

class ActiveStorage::Blob
  sig { returns(ActiveStorage::Filename) }
  def filename; end

  sig do
    type_parameters(:U)
      .params(
        tmpdir: T.nilable(T.any(String, Pathname)),
        block: T.proc.params(file: Tempfile).returns(T.type_parameter(:U)),
      ).returns(T.type_parameter(:U))
  end
  def open(tmpdir: T.unsafe(nil), &block); end

  class << self
    sig do
      params(id: T.untyped, record: T.untyped, purpose: T.untyped)
        .returns(T.nilable(T.attached_class))
    end
    def find_signed(id, record: T.unsafe(nil), purpose: T.unsafe(nil)); end
    sig do
      params(id: T.untyped, record: T.untyped, purpose: T.untyped)
        .returns(T.attached_class)
    end
    def find_signed!(id, record: T.unsafe(nil), purpose: T.unsafe(nil)); end
  end
end

class ActiveRecord::Base
  include ActiveStorage::Attached::Model
end
