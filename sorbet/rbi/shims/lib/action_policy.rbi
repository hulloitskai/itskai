# typed: strong

class ActionController::Base
  include ActionPolicy::Controller
end

class ActionPolicy::Base
  class << self
    sig do
      params(
        args: T.untyped,
        block: T.proc
          .bind(T.attached_class)
          .params(relation: ActiveRecord::Relation)
          .returns(ActiveRecord::Relation),
      ).void
    end
    def relation_scope(*args, &block); end
  end

  sig { returns(T.noreturn) }
  def deny!; end
end

module ActionPolicy::ScopeMatchers::ActiveRecord
  sig do
    params(
      args: T.untyped,
      kwargs: T.untyped,
      block: T.proc
        .params(relation: ActiveRecord::Relation)
        .returns(ActiveRecord::Relation),
    ).void
  end
  def relation_scope(*args, **kwargs, &block); end
end

module ActionPolicy::Behaviours::Scoping
  sig do
    type_parameters(:U).params(
      target: T.all(T.type_parameter(:U), ActiveRecord::Relation),
      type: Symbol,
      as: Symbol,
      scope_options: T::Hash[Symbol, T.untyped],
      options: T.untyped,
    ).returns(T.type_parameter(:U))
  end
  def authorized_scope(
    target,
    type: T.unsafe(nil),
    as: T.unsafe(nil),
    scope_options: T.unsafe(nil),
    **options
  ); end
end
