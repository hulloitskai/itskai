# typed: true
# frozen_string_literal: true

class QrCodeGenerator < ApplicationService
  # == Methods
  sig { returns(String) }
  def api_key
    T.must(self.class.api_key)
  end

  sig do
    type_parameters(:U)
      .params(
        url: String,
        block: T.proc
          .params(file: Tempfile)
          .returns(T.type_parameter(:U)),
      )
      .returns(T.type_parameter(:U))
  end
  def generate_qr_code(url, &block)
    Tempfile.open(["", ".png"]) do |file|
      file.binmode
      HTTParty.post(
        "https://api.qr-code-generator.com/v1/create",
        query: {
          "access-token" => api_key,
        },
        body: {
          "qr_code_logo" =>
            "account23355854/logo/88c5fc4de955e0711bb9ece57f4e3455.png",
          "qr_code_text" => url,
          # "qr_code_pattern" => "rounded-1",
          "background_color" => "#FFFFFF",
          "frame_name" => "qrcg-scan-me-arrow-frame",
          "frame_color" => "#FAA84B",
          "frame_text" => "Scan Me!",
          "frame_text_alignment" => "left",
          "frame_text_font" => "yesteryear",
          "image_format" => "PNG",
          "image_width" => 1024,
        },
        stream_body: true,
      ) do |fragment|
        file.write(fragment)
      end
      file.rewind
      yield file
    end
  end
end

class QrCodeGenerator
  class << self
    # == Methods: Service
    sig { override.returns(T::Boolean) }
    def enabled?
      return !!@enabled if defined?(@enabled)
      @enabled = T.let(@enabled, T.nilable(T::Boolean))
      @enabled = T.let(super, T::Boolean) && api_key.present?
    end

    # == Methods
    sig { returns(T.nilable(String)) }
    def api_key
      return @api_key if defined?(@api_key)
      @api_key = T.let(@api_key, T.nilable(String))
      @api_key = ENV.fetch("QR_CODE_GENERATOR_API_KEY")
    end

    sig do
      type_parameters(:U)
        .params(
          url: String,
          block: T.proc
            .params(file: Tempfile)
            .returns(T.type_parameter(:U)),
        )
        .returns(T.type_parameter(:U))
    end
    def generate_qr_code(url, &block) = instance.generate_qr_code(url, &block)
  end
end
