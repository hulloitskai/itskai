# typed: strong

module ActionText
  class RichText
    module GeneratedAttributeMethods
      sig { returns(Content) }
      def body; end
    end
  end
end

class ActiveRecord::Base
  include ActionText::Attribute
end
