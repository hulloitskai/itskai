# typed: strong

class ICloudService
  class << self
    sig { returns(Pathname) }
    def credentials_dir; end

    sig { params(value: Pathname).void }
    def credentials_dir=(value); end
  end

  sig { returns(Pathname) }
  def credentials_dir; end

  sig { params(value: Pathname).void }
  def credentials_dir=(value); end
end
