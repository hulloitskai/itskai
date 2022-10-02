# typed: strong

class Types::ValidationErrorType
  sig { override.returns(ActiveModel::Error) }
  def object; end
end
