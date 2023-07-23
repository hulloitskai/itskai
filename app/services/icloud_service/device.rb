# typed: true
# frozen_string_literal: true

class ICloudService
  class Device
    extend T::Sig

    sig { returns(String) }
    def id
      attributes[:id]
    end

    sig { returns(String) }
    def name
      attributes[:name]
    end

    sig { returns(T::Hash[Symbol, T.untyped]) }
    def location
      @pydevice.location.to_h.transform_keys do |key|
        key.underscore.to_sym
      end
    end

    sig { void }
    def play_sound
      @pydevice.play_sound
    end

    sig { returns(T::Hash[Symbol, T.untyped]) }
    def attributes
      @attributes ||= @pydevice.content.to_h.transform_keys do |key|
        key.underscore.to_sym
      end
    end

    protected

    sig { params(pydevice: T.untyped).void }
    def initialize(pydevice)
      @pydevice = pydevice
    end
  end
end
