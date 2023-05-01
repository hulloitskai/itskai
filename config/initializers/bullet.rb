# typed: true
# frozen_string_literal: true

if defined?(Bullet)
  require "bullet_ext"

  Bullet.enable = true
  Bullet.bullet_logger = true
  Bullet.add_footer = true
end
