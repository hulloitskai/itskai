# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for dynamic methods in `Devise::Mailer`.
# Please instead update this file by running `bin/tapioca dsl Devise::Mailer`.

class Devise::Mailer
  class << self
    sig { params(record: T.untyped, token: T.untyped, opts: T.untyped).returns(::ActionMailer::MessageDelivery) }
    def confirmation_instructions(record, token, opts = T.unsafe(nil)); end

    sig { returns(::ActionMailer::MessageDelivery) }
    def current_user; end

    sig { params(record: T.untyped, opts: T.untyped).returns(::ActionMailer::MessageDelivery) }
    def email_changed(record, opts = T.unsafe(nil)); end

    sig { params(record: T.untyped, opts: T.untyped).returns(::ActionMailer::MessageDelivery) }
    def password_change(record, opts = T.unsafe(nil)); end

    sig { params(record: T.untyped, token: T.untyped, opts: T.untyped).returns(::ActionMailer::MessageDelivery) }
    def reset_password_instructions(record, token, opts = T.unsafe(nil)); end

    sig { params(record: T.untyped, token: T.untyped, opts: T.untyped).returns(::ActionMailer::MessageDelivery) }
    def unlock_instructions(record, token, opts = T.unsafe(nil)); end
  end
end
