# typed: strict
# frozen_string_literal: true

class ICloudClient
  class Device
    extend T::Sig

    # == Methods
    sig { returns(String) }
    def id
      attributes.fetch("id")
    end

    sig { returns(String) }
    def name
      attributes.fetch("name")
    end

    sig { returns(T.nilable(T::Hash[String, T.untyped])) }
    def location
      if (location = @pydevice.location)
        location.to_h
      end
    end

    sig { void }
    def play_sound
      @pydevice.play_sound
    end

    sig { returns(T::Hash[String, T.untyped]) }
    def attributes
      @attributes ||= T.let(
        @pydevice.data.to_h,
        T.nilable(T::Hash[Symbol, T.untyped]),
      )
    end

    protected

    sig { params(pydevice: T.untyped).void }
    def initialize(pydevice)
      @pydevice = pydevice
    end
  end
end
