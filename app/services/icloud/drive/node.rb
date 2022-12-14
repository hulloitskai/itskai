# typed: strict
# frozen_string_literal: true

class ICloud
  class Drive
    class Node
      extend T::Sig

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
        @pynode.get_children.try! do |children|
          children.to_a.map { |node| Node.new(node) }
        end || []
      end

      sig { params(name: T.untyped).returns(T.nilable(T.self_type)) }
      def get(name)
        @pynode.get(name).try! { |pynode| Node.new(pynode) }
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
        @pynode.date_modified.try! do |datetime|
          Time.zone.at(datetime.timestamp)
        end
      end

      sig { returns(ActiveSupport::TimeWithZone) }
      def modified_at!
        T.must(modified_at)
      end

      protected

      sig { params(pynode: T.untyped).void }
      def initialize(pynode)
        @pynode = pynode
      end
    end
  end
end
