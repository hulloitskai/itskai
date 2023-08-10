# typed: false
# frozen_string_literal: true

require "pry-doc"
require "pry-sorbet"
require "pry-stack_explorer"
require "break"

# Fix control characters.
#
# TODO: No longer necessary when https://github.com/pry/pry/pull/2209 is merged.
ENV["PAGER"] = " less --raw-control-chars -F -X"

# == Commands
Pry::Commands.block_command("clear", "Clear the screen.") do
  system("clear")
end

Pry::Commands.block_command(
  "copy",
  "Copy argument to the system clipboard.",
) do |arg|
  IO.popen("pbcopy", "w") do |f|
    value = target.eval(arg)
    f << value.to_s
  end
end

Pry::Commands.block_command("debug", "Debug the current binding.") do
  run "exit-all binding.break(pre: 'finish 38 ;; up')"
end

Pry::Commands.block_command("sql", "Perform an SQL query over AR.") do |query|
  if ENV["RAILS_ENV"] || defined?(Rails)
    pp(ActiveRecord::Base.connection.select_all(query))
  else
    pp("Error: Not in a Rails environment.")
  end
end

Pry::Commands.block_command(
  "caller_method",
  "Show the caller method.",
) do |depth|
  depth = depth.to_i || 1
  if /^(.+?):(\d+)(?::in `(.*)')?/ =~ caller(depth + 1).first
    file = Regexp.last_match[1]
    line = Regexp.last_match[2].to_i
    method = Regexp.last_match[3]
    output.puts [file, line, method]
  end
end
