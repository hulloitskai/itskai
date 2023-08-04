# typed: true
# frozen_string_literal: true

module Location
  class << self
    extend T::Sig

    # == Methods
    sig { returns(T.nilable(Time)) }
    def hide_until
      return @hide_until if defined?(@hide_until)
      @hide_until = T.let(@hide_until, T.nilable(Time))
      @hide_until = suppress(ArgumentError) do
        ENV["LOCATION_HIDE_UNTIL"]&.to_time
      end
    end

    sig { returns(T::Boolean) }
    def hide?
      if (hide_until = self.hide_until)
        hide_until > Time.zone.now
      else
        false
      end
    end

    sig { returns(T.nilable(LocationLog)) }
    def current
      LocationLog.latest(timestamp: 6.hours.ago..) unless hide?
    end
  end
end
