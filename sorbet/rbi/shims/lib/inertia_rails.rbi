# typed: strong

class ActionController::Base
  include InertiaRails::Controller

  class << self
    sig do
      params(
        args: T::Hash[T.any(Symbol, String), T.proc.returns(T.untyped)],
        block: T.nilable(T.proc.bind(T.attached_class).void),
      ).void
    end
    def inertia_share(*args, &block); end
  end
end

class InertiaRails::Renderer
  sig { returns (T::Hash[T.any(Symbol, String), T.untyped]) }
  def view_data; end
end

module InertiaRails
  sig { returns(Configuration) }
  def self.configuration; end
end
