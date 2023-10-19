# typed: strict
# frozen_string_literal: true

class ICloudClient
  class Device
    extend T::Sig

    # == Methods
    sig { returns(String) }
    def id
      attributes[:id]
    end

    sig { returns(String) }
    def name
      attributes[:name]
    end

    sig { returns(T.nilable(T::Hash[Symbol, T.untyped])) }
    def location
      if (location = @pydevice.location)
        location.to_h.transform_keys do |key|
          key.underscore.to_sym
        end
      end
    end

    sig { void }
    def play_sound
      @pydevice.play_sound
    end

    sig { returns(T::Hash[Symbol, T.untyped]) }
    def attributes
      @attributes ||= T.let(
        @pydevice.content.to_h.transform_keys { |key| key.underscore.to_sym },
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
