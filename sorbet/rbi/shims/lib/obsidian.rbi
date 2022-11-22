# typed: strong

module Obsidian
  class << self
    sig { returns(ActiveSupport::Logger) }
    def logger; end

    sig { params(value: ActiveSupport::Logger).void }
    def logger=(value); end

    sig { returns(Pathname) }
    def vault_root; end

    sig { params(value: Pathname).void }
    def vault_root=(value); end
  end

  sig { returns(ActiveSupport::Logger) }
  def logger; end

  sig { params(value: ActiveSupport::Logger).void }
  def logger=(value); end

  sig { returns(Pathname) }
  def vault_root; end

  sig { params(value: Pathname).void }
  def vault_root=(value); end
end
