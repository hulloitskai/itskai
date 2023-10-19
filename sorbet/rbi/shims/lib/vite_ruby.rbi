# typed: strict

class ViteRuby
  sig { returns(Manifest) }
  def manifest; end

  sig { returns(T.attached_class)}
  def self.instance; end
end
