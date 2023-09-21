# typed: ignore

module HTTParty
  class << self
    sig { params(args: T.untyped, block: T.untyped).returns(Response) }
    def get(*args, &block); end
  end
end
