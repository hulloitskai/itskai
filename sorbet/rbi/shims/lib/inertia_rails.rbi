# typed: strong

class ActionController::Base
  class << self
    sig do
      params(args: T.untyped, block: T.proc.bind(T.attached_class).void).void
    end
    def inertia_share(*args, &block); end
  end
end
