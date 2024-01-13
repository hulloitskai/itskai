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

    sig { returns(T.nilable(ActiveSupport::HashWithIndifferentAccess)) }
    def location
      if (location = @pydevice.location)
        location.to_h.with_indifferent_access
      end
    end

    sig { void }
    def play_sound
      @pydevice.play_sound
    end

    sig { returns(ActiveSupport::HashWithIndifferentAccess) }
    def attributes
      @attributes ||= T.let(
        @pydevice.content.to_h.with_indifferent_access,
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
