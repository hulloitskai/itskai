# typed: strict
# frozen_string_literal: true

class ICloudDrive
  extend T::Sig

  # == Current
  sig { returns(T.nilable(ICloudDrive)) }
  def self.current
    ICloudClient.current&.drive
  end

  sig { returns(ICloudDrive) }
  def self.current!
    current or raise "iCloud drive not initialized"
  end

  # == Initializers
  sig { params(pydrive: T.untyped).void }
  def initialize(pydrive)
    @pydrive = pydrive
  end

  # == Methods
  sig { returns(ICloudDriveNode) }
  def root
    ICloudDriveNode.new(@pydrive.root)
  end

  sig { returns(T::Array[ICloudDriveNode]) }
  def children
    root.children
  end

  sig do
    params(path: T.any(Pathname, String)).returns(T.nilable(ICloudDriveNode))
  end
  def get(path)
    node = T.let(root, T.nilable(ICloudDriveNode))
    path = Pathname.new(path) if path.is_a?(String)
    path.each_filename do |name|
      break if node.nil?
      node = node.children.find { |node| node.name == name }
    end
    node
  end
end
