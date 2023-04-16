# typed: true
# frozen_string_literal: true

class ICloudService
  class Drive
    extend T::Sig

    sig { returns(Node) }
    def root
      Node.new(@pydrive.root)
    end

    sig { returns(T::Array[Node]) }
    def children
      root.children
    end

    sig { params(path: T.any(Pathname, String)).returns(T.nilable(Node)) }
    def get(path)
      node = T.let(root, T.nilable(Node))
      path = Pathname.new(path) if path.is_a?(String)
      path.each_filename do |name|
        node = T.must(node)
        node = node.children.find { |node| node.name == name }
        break if node.nil?
      end
      node
    end

    protected

    sig { params(pydrive: T.untyped).void }
    def initialize(pydrive)
      @pydrive = pydrive
    end
  end
end
