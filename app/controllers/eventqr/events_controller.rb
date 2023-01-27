# typed: true
# frozen_string_literal: true

module Eventqr
  class EventsController < ApplicationController
    # == Configuration
    protect_from_forgery with: :null_session, only: :create

    # == Filters
    before_action :set_event, except: :create

    # == Actions
    def show
      @event = T.must(@event)
      redirect_to(@event.invite_blob!)
    end

    def create
      payload = T.let(params.permit!.to_h, T::Hash[String, T.untyped])
      from = T.let(payload.dig("from", "value", 0),
                   T::Hash[String, T.untyped])
      attachment = scoped do
        attachments = T.let(payload.fetch("attachments"),
                            T::Array[T::Hash[String, T.untyped]])
        attachments.find do |attachment|
          attachment.fetch("contentType") == "text/calendar"
        end or return
      end
      content = T.let(attachment.fetch("content"), T::Hash[String, T.untyped])
      filename = T.let(attachment.fetch("filename", "invite.ics"), String)
      data = T.let(content.fetch("data"), T::Array[Integer])
      with_temp_file(filename) do |file|
        file.write(data.pack("C*")).tap { file.rewind }
        Event.create_from_file!(
          io: file,
          filename:,
          inviter_email: from.fetch("address"),
          inviter_name: from["name"],
        )
      end
      head(:no_content)
    end

    private

    # == Helpers
    sig do
      params(
        filename: String,
        block: T.proc.params(file: File).void,
      ).returns(T.untyped)
    end
    def with_temp_file(filename, &block)
      Dir.mktmpdir do |dir|
        File.open(File.join(dir, filename), "w+b", &block)
      end
    end

    # == Filters
    def set_event
      @event = T.let(@event, T.nilable(Event))
      @event = Event.friendly.find(params[:id])
    end
  end
end
