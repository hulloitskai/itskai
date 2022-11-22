# typed: strong

module ICloud
  class << self
    sig { returns(ActiveSupport::Logger) }
    def logger; end

    sig { params(value: ActiveSupport::Logger).void }
    def logger=(value); end

    sig { returns(String) }
    def credentials_dir; end

    sig { params(value: String).void }
    def credentials_dir=(value); end
  end

  sig { returns(ActiveSupport::Logger) }
  def logger; end

  sig { params(value: ActiveSupport::Logger).void }
  def logger=(value); end

  sig { returns(String) }
  def credentials_dir; end

  sig { params(value: String).void }
  def credentials_dir=(value); end
end
