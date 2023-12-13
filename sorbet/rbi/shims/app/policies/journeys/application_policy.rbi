# typed: strong

module Journeys
  class ApplicationPolicy
    sig { returns(String) }
    def participant_id; end
  end
end
