# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for dynamic methods in `Users::DeviseMailer`.
# Please instead update this file by running `bin/tapioca dsl Users::DeviseMailer`.


class Users::DeviseMailer
  class << self
    sig do
      params(
        record: ::User,
        token: ::String,
        opts: T::Hash[::Symbol, T.untyped]
      ).returns(::ActionMailer::MessageDelivery)
    end
    def confirmation_instructions(record, token, opts = T.unsafe(nil)); end

    sig { params(record: ::User, opts: T::Hash[::Symbol, T.untyped]).returns(::ActionMailer::MessageDelivery) }
    def email_changed(record, opts = T.unsafe(nil)); end

    sig { params(record: ::User, opts: T::Hash[::Symbol, T.untyped]).returns(::ActionMailer::MessageDelivery) }
    def password_change(record, opts = T.unsafe(nil)); end

    sig do
      params(
        record: ::User,
        token: ::String,
        opts: T::Hash[::Symbol, T.untyped]
      ).returns(::ActionMailer::MessageDelivery)
    end
    def reset_password_instructions(record, token, opts = T.unsafe(nil)); end

    sig { params(record: T.untyped, token: T.untyped, opts: T.untyped).returns(::ActionMailer::MessageDelivery) }
    def unlock_instructions(record, token, opts = T.unsafe(nil)); end
  end
end
