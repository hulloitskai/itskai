# typed: true
# frozen_string_literal: true

module JsFromRoutes
  class << self
    # Patch the `generate!` method to clean the output folder before generating
    # new routes.
    module CleanOutputFolderBeforeGenerate
      extend T::Sig
      extend T::Helpers

      requires_ancestor { T.class_of(JsFromRoutes) }

      def generate!(...)
        if ENV["ROUTES_JS_FORCE"] &&
            (output_folder = config.output_folder.presence)
          FileUtils.rm_rf(Dir.glob("#{output_folder}/*"))
        end
        super
      end
    end
    prepend CleanOutputFolderBeforeGenerate
  end
end
