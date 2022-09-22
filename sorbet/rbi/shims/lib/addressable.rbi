# typed: strong

module Addressable
  class URI
    sig { params(uri: String).returns(URI) }
    def self.parse(uri); end

    sig { returns(String) }
    def path; end
  end
end
