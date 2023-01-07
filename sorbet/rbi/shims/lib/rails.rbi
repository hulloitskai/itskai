# typed: strong

module Rails
  class << self
    sig {returns(ActiveSupport::ErrorReporter)}
    def error; end
  end
end
