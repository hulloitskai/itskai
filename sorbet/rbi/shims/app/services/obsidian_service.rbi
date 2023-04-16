# typed: strong

class ObsidianService
  class << self
    sig { returns(Pathname) }
    def vault_root_dir; end

    sig { params(value: Pathname).void }
    def vault_root_dir=(value); end
  end

  sig { returns(Pathname) }
  def vault_root_dir; end

  sig { params(value: Pathname).void }
  def vault_root_dir=(value); end
end
