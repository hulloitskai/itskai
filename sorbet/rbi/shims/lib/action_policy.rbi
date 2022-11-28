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

module ActionPolicy::Behaviours::Scoping
  sig do
    params(
      target: ActiveRecord::Relation,
      type: Symbol,
      as: Symbol,
      scope_options: T::Hash[Symbol, T.untyped],
      options: T.untyped,
    )
      .returns(ActiveRecord::Relation)
  end
  def authorized_scope(
    target,
    type: T.unsafe(nil),
    as: T.unsafe(nil),
    scope_options: T.unsafe(nil),
    **options
  ); end
end
