# typed: strong

module Handled
  module ClassMethods
    sig { returns(Integer) }
    def generated_handle_length; end

    sig { params(size: Integer).returns(Integer) }
    def generated_handle_length=(size); end
  end
end
