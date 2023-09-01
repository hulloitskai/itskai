# typed: strict
# frozen_string_literal: true

require "inertia_rails"

module InertiaRails
  class Engine
    initializer "inertia_rails.action_mailer" do
      ActiveSupport.on_load(:action_mailer) do
        prepend Mailer
      end
    end
  end
end
