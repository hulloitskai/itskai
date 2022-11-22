# typed: strong

class ActionController::Base
  include ActionPolicy::Controller
end

class ActionPolicy::Base
  sig { returns(T.noreturn) }
  def deny!; end
end

module ActionPolicy::ScopeMatchers::ActiveRecord
  sig do
    params(
      args: T.untyped,
      block:
        T
          .proc
          .params(relation: ActiveRecord::Relation)
          .returns(ActiveRecord::Relation),
    ).void
  end
  def relation_scope(*args, &block); end
end
