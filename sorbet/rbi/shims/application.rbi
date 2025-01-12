# typed: strong

module Rails
  class << self
    sig { returns(ItsKai::Application) }
    def application; end
  end
end
