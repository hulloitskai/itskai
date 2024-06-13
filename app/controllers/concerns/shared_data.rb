# typed: true
# frozen_string_literal: true

module SharedData
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  requires_ancestor { ActionController::Base }

  included do
    T.bind(self, T.untyped)

    inertia_share csrf: lambda { csrf_data },
                  flash: lambda { flash.to_h },
                  "currentUser" => lambda {
                    UserSerializer.one_if(current_user)
                  }
  end

  private

  sig { returns(T::Hash[Symbol, String]) }
  def csrf_data
    {
      param: request_forgery_protection_token,
      token: form_authenticity_token,
    }
  end
end
