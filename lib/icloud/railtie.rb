# typed: strict
# frozen_string_literal: true

require "rails"

module ICloud
  class Railtie < Rails::Railtie
    config.icloud = ActiveSupport::OrderedOptions.new

    initializer "icloud.set_configs" do |app|
      options = app.config.icloud
      options.logger = Rails.logger
      options.credentials_dir = Rails.root.join("tmp/icloud").to_s

      ActiveSupport.on_load(:icloud) do
        T.bind(self, T.class_of(ICloud))
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

    initializer "icloud.initialize" do
      config.after_initialize do
        if Rails.const_defined?(:Server)
          puts "=> Initializing iCloud" # rubocop:disable Rails/Output
        end
        if Rails.const_defined?(:Server) || Rails.const_defined?(:Console)
          ICloud.initialize
        end
      end
    end
  end
end
