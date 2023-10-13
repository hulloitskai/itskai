# typed: strict

class ViteRuby
  sig { returns(T.attached_class)}
  def self.instance; end

  sig { returns(Manifest) }
  def manifest; end
end
