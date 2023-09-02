# typed: strict
# frozen_string_literal: true

class ICloudDrive
  extend T::Sig

  # == Initializers
  sig { params(pydrive: T.untyped).void }
  def initialize(pydrive)
    @pydrive = pydrive
  end

  # == Current
  sig { returns(T.nilable(ICloudDrive)) }
  def self.current
    ICloudClient.current&.drive
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
