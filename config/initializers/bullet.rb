# typed: strict
# frozen_string_literal: true

return unless defined?(Bullet)
require "bullet_ext"

Bullet.enable = true
Bullet.bullet_logger = true
Bullet.add_footer = true
