# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for dynamic methods in `TestMailer`.
# Please instead update this file by running `bin/tapioca dsl TestMailer`.

class TestMailer
  class << self
    sig { returns(::ActionMailer::MessageDelivery) }
    def current_user; end

    sig { returns(::ActionMailer::MessageDelivery) }
    def hello_world_email; end
  end
end
