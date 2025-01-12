# typed: true
# frozen_string_literal: true

module AuthenticatesFriends
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  requires_ancestor { ActionController::Base }

  included do
    T.bind(self, T.class_of(ActionController::Base))

    authorize :friend, through: :current_friend
  end

  private

  # == Helpers
  sig { returns(T.nilable(Friend)) }
  attr_reader :current_friend

  sig { returns(String) }
  def friend_token
    params[:friend_token] or raise "Missing friend token"
  end

  sig { returns(Friend) }
  def authenticate_friend!
    @current_friend ||= scoped do
      Friend.find_by(token: friend_token) or raise "Invalid friend token"
    end
  end
end
