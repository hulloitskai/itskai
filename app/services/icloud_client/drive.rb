# typed: strict
# frozen_string_literal: true

class ICloudClient
  class Drive
    extend T::Sig

    # == Current
    sig { returns(T.nilable(Drive)) }
    def self.current
      ICloudClient.current&.drive
    end

    sig { returns(Drive) }
    def self.current!
      ICloudClient.current!.drive
    end

    # == Initializers
    sig { params(pydrive: T.untyped).void }
    def initialize(pydrive)
      @pydrive = pydrive
    end

    # == Methods
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
        break if node.nil?
        node = node.children.find { |node| node.name == name }
      end
      node
    end
  end
end
