# typed: strict
# frozen_string_literal: true

if (venv = `poetry env info --path`.strip.presence)
  version = PyCall.sys.version_info
  PyCall.sys.path.append(File.join(
    venv,
    "lib",
    "python#{version.major}.#{version.minor}",
    "site-packages",
  ))
end
PyCall.sys.path.append(Rails.root.join("pylib").to_s)
