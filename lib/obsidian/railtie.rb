# typed: strict
# frozen_string_literal: true

require "rails"

module Obsidian
  class Railtie < Rails::Railtie
    config.obsidian = ActiveSupport::OrderedOptions.new

    initializer "obsidian.set_configs" do |app|
      options = app.config.obsidian
      options.logger =
        ActiveSupport::TaggedLogging.new(Rails.logger).tagged("Obsidian")
      options.vault_root = Pathname.new("Obsidian/Kai")

      ActiveSupport.on_load(:obsidian) do
        T.bind(self, T.class_of(Obsidian))
        options.each do |k, v|
          k = "#{k}="
          if respond_to?(k)
            send(k, v)
          else
            raise "Invalid option key: #{k}"
          end
        end
      end
    end
  end
end
