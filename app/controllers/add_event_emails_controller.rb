# typed: true
# frozen_string_literal: true

class AddEventEmailsController < ApplicationController
  # == Filters
  skip_forgery_protection only: :create

  # == Actions
  # POST /events/emails
  def create
    authorize_origin!
    authorize_sender!
    timestamp = T.let(params[:date], String)
    subject = T.let(params[:subject], T.nilable(String))
    body = T.let(params[:text], T.nilable(String))
    attachments = T.let(params[:attachments], T::Array[T.untyped])
    email = AddEventEmail.new(timestamp:, subject:, body:)
    attachments.each do |attachment|
      data = T.let(attachment.dig(:content, :data), T::Array[Integer])
      filename = T.let(attachment.dig(:filename), String)
      email.attachments.attach(io: StringIO.new(data.pack("C*")), filename:)
    end
    email.save!
    head(:ok)
  end

  private

  # == Helpers
  sig { void }
  def authorize_origin!
    origin = Reversed.lookup(client_ip, nameservers: ["1.1.1.1"])
    unless origin.ends_with?("forwardemail.net")
      with_log_tags do
        logger.error("Unauthorized origin: #{origin}")
      end
      raise "Unauthorized origin"
    end
  end

  sig { void }
  def authorize_sender!
    sender_email = params.dig(:from, :value, 0, :address)
    unless sender_email == Owner.email
      with_log_tags do
        logger.error("Unauthorized sender: #{sender_email}")
      end
      raise "Unauthorized sender"
    end
  end

  sig { returns(String) }
  def client_ip
    request.headers["Fly-Client-IP"] || request.remote_ip
  end
end
