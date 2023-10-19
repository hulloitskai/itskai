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

  # == Lifecycle
  sig { override.void }
  def start
    return if @watcher
    @watcher = Listen.to(QueryManager::FILES_DIR, only: /\.graphql$/) do
      Rails.application.reloader.wrap do
        tag_logger do
          logger.info("Changes detected, reloading queries...")
        end
        QueryManager.load
      end
    end
    ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
      @watcher.start
    end
  end

  sig { override.void }
  def stop
    if @watcher
      ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
        @watcher.stop
      end
      @watcher = nil
    end
  end
end
