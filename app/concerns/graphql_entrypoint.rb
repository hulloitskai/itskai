# typed: strict
# frozen_string_literal: true

module GraphQLEntrypoint
  extend T::Sig
  extend T::Helpers

  # == Annotations
  requires_ancestor { Kernel }

  # == Methods
  # Handle variables in form data, JSON body, or a blank value.
  sig { params(variables_param: T.untyped).returns(T::Hash[String, T.untyped]) }
  def prepare_variables(variables_param)
    prepare_hash(variables_param)
  rescue ArgumentError
    raise "Unexpected variables parameter: #{variables_param}"
  end

  # Handle extensions in form data, JSON body, or a blank value.
  sig do
    params(extensions_param: T.untyped).returns(T::Hash[String, T.untyped])
  end
  def prepare_extensions(extensions_param)
    prepare_hash(extensions_param)
  rescue ArgumentError
    raise "Unexpected extensions parameter: #{extensions_param}"
  end

  sig { params(value: T.untyped).returns(T::Hash[String, T.untyped]) }
  def prepare_hash(value)
    case value
    when String
      value.present? ? JSON.parse(value) || {} : {}
    when Hash
      value
    when ActionController::Parameters
      # GraphQL-Ruby will validate name and type of incoming extensions.
      value.to_unsafe_hash
    when nil
      {}
    else
      raise ArgumentError
    end
  end
end
