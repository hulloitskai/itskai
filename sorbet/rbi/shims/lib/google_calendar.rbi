# typed: strong

module Google
  class Calendar
    sig do
      params(start_min: Time, start_max: Time, options: T.untyped).
        returns(T::Array[Event])
    end
    def find_events_in_range(start_min, start_max, options = T.unsafe(nil))
    end
  end
end
