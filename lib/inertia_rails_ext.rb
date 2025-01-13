# typed: true
# frozen_string_literal: true

require "inertia_rails"
require "core_ext"

module InertiaRailsExt
  ControllerWithoutIncludedBlock = scoped do
    mod = InertiaRails::Controller.clone
    mod.remove_instance_variable(:@_included_block)
    mod
  end
end

require_relative "inertia_rails_ext/engine"
require_relative "inertia_rails_ext/mailer"
require_relative "inertia_rails_ext/controller"
require_relative "inertia_rails_ext/middleware"
