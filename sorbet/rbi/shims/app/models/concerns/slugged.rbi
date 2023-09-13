# typed: strong

module Slugged
  module ClassMethods
    sig { returns(Integer) }
    def generated_slug_length; end

    sig { params(size: Integer).returns(Integer) }
    def generated_slug_length=(size); end
  end
end
