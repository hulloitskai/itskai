# typed: strict
# frozen_string_literal: true

class ICloudClient
  class Drive
    class Node
      extend T::Sig

      # == Initializers
      sig { params(pynode: T.untyped).void }
      def initialize(pynode)
        @pynode = pynode
      end

      # == Methods
      sig { returns(String) }
      def name
        @pynode.name
      end

      sig { returns(String) }
      def type
        @pynode.type
      end

      sig { returns(T::Array[Node]) }
      def children
        if (children = @pynode.get_children)
          children.to_a.map { |node| Node.new(node) }
        else
          []
        end
      end

      sig { params(name: T.untyped).returns(T.nilable(T.self_type)) }
      def get(name)
        if (pynode = @pynode.get(name))
          Node.new(pynode)
        end
      end

      sig { returns(T.untyped) }
      def open
        @pynode.open
      end

      sig { returns(String) }
      def read
        response = open
        response.text.tap { response.close }
      end

      sig { returns(T.nilable(ActiveSupport::TimeWithZone)) }
      def modified_at
        if (date = @pynode.date_modified)
          Time.zone.at(date.timestamp)
        end
      end

      sig { returns(ActiveSupport::TimeWithZone) }
      def modified_at!
        modified_at or raise "Missing `modified_at' attribute"
      end
    end
  end
end
