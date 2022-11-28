# typed: strong

module Spotify
  class << self
    sig { returns(ActiveSupport::Logger) }
    def logger; end

    sig { params(value: ActiveSupport::Logger).void }
    def logger=(value); end
  end

  sig { returns(ActiveSupport::Logger) }
  def logger; end

  sig { params(value: ActiveSupport::Logger).void }
  def logger=(value); end
end
