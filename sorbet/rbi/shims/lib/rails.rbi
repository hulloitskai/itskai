# typed: strong

module Rails
  sig {returns(ActiveSupport::ErrorReporter) }
  def self.error; end

  class Application
    sig { returns(ActionDispatch::Routing::RouteSet) }
    def self.routes; end

    sig { returns(T.class_of(ActiveSupport::Reloader)) }
    def reloader; end
  end
end
