# typed: strict
# frozen_string_literal: true

require "sorbet-runtime"

module Location
  extend T::Sig

  # == Methods
  sig { returns(T.nilable(Time)) }
  def self.hide_until
    return @hide_until if defined?(@hide_until)
    @hide_until = T.let(@hide_until, T.nilable(Time))
    @hide_until = suppress(ArgumentError) do
      ENV["LOCATION_HIDE_UNTIL"]&.to_time
    end
  end

  sig { returns(T::Boolean) }
  def self.hide?
    if (hide_until = self.hide_until)
      hide_until > Time.zone.now
    else
      false
    end
  end
end
