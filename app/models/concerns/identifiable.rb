# typed: strict
# frozen_string_literal: true

module Identifiable
  extend T::Sig
  extend T::Helpers

  abstract!
  requires_ancestor { ApplicationRecord }

  extend ActiveSupport::Concern

  # == Attributes ==
  sig { returns(String) }
  def id!
    self[:id] ||= SecureRandom.uuid
  end

  # == Methods: Short ==
  sig { returns(T.nilable(String)) }
  def short_id
    id.try! do |id|
      id = T.let(id, String)
      ShortUUID.shorten(id)
    end
  end

  sig { returns(String) }
  def short_id!
    ShortUUID.shorten(id!)
  end

  # == Parameters ==
  sig { returns(T.nilable(String)) }
  def to_param
    short_id
  end

  class_methods do
    extend T::Sig
    extend T::Helpers

    requires_ancestor { T.class_of(ApplicationRecord) }

    # == Finders ==
    sig { params(args: T.untyped).returns(T.untyped) }
    def find(*args)
      id = args.first
      if id.is_a?(String) && id.length < 36
        Kernel.suppress(Exception) { args[0] = ShortUUID.expand(id) }
      end
      super(*T.unsafe(args))
    end

    sig { params(args: T.untyped).returns(T::Boolean) }
    def exists?(*args)
      id = args.first
      if id.is_a?(String) && id.length < 36
        Kernel.suppress(Exception) { args[0] = ShortUUID.expand(id) }
      end
      super(*T.unsafe(args))
    end
  end
end
