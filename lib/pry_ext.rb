# typed: false
# frozen_string_literal: true

class Pry::Method
  # Fix for an issue with pry-sorbet.
  def source_location
    loc = super
    return loc unless defined?(T::Private::Methods) && @method.is_a?(Method)
    signature = T::Private::Methods.signature_for_method(@method)
    return loc unless signature
    signature.method.source_location
  end
end
