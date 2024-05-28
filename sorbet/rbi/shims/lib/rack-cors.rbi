# typed: strict

class Rack::Cors
  sig { params(block: T.proc.bind(Resources).void).void }
  def allow(&block); end
end
