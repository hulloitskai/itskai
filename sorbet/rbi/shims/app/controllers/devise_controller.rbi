# typed: strong

class DeviseController
  protected

  sig { returns(T.class_of(User)) }
  def resource_class; end

  sig { returns(T.nilable(User)) }
  def resource; end
end
