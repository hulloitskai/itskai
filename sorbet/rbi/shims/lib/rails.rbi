# typed: strong

module Rails
  sig {returns(ActiveSupport::ErrorReporter) }
  def self.error; end

  class Application
    sig { returns(ActionDispatch::Routing::RouteSet) }
    def self.routes; end
  end
end
