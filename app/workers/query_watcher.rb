# typed: strict
# frozen_string_literal: true

class QueryWatcher < ApplicationWorker
  # == Initializer
  sig { void }
  def initialize
    super
    require "listen"
    @watcher = T.let(@watcher, T.nilable(Listen::Listener))
  end

  sig { returns(T.nilable(Listen::Listener)) }
  attr_accessor :watcher

  # == Lifecycle
  sig { override.void }
  def self.start
    return if instance.watcher
    watcher = instance.watcher = Listen.to(
      QueryManager::FILES_DIR,
      only: /\.graphql$/,
    ) do
      Rails.application.reloader.wrap do
        with_log_tags do
          logger.info("Changes detected, reloading queries...")
        end
        QueryManager.load
      end
    end
    ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
      watcher.start
    end
  end

  sig { override.void }
  def self.stop
    if (watcher = instance.watcher)
      ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
        watcher.stop
      end
      instance.watcher = nil
    end
  end
end
