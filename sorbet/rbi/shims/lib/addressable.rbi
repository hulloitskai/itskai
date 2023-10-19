# typed: strong

module Addressable
  class URI
    sig { returns(String) }
    def path; end

    sig { params(uri: String).returns(URI) }
    def self.parse(uri); end
  end
end
