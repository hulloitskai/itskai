# typed: strong

module Searchkick
  class << self
    sig do
      params(
          term: T.untyped,
          model: T.untyped,
          options: T.untyped,
          block: T.untyped,
        )
        .returns(Relation)
    end
    def search(
      term = T.unsafe(nil),
      model: T.unsafe(nil),
      **options,
      &block
    ); end
  end

  class Relation
    include Enumerable

    # source://forwardable/1.3.2/forwardable.rb#229
    def [](*args, **_arg1, &block); end

    # source://searchkick//lib/searchkick/results.rb#42
    def aggregations; end

    # source://searchkick//lib/searchkick/results.rb#46
    def aggs; end

    # source://forwardable/1.3.2/forwardable.rb#229
    def any?(*args, **_arg1, &block); end

    # source://searchkick//lib/searchkick/results.rb#205
    def clear_scroll; end

    # source://searchkick//lib/searchkick/results.rb#98
    def current_page; end

    # source://forwardable/1.3.2/forwardable.rb#229
    def each(*args, **_arg1, &block); end

    # source://forwardable/1.3.2/forwardable.rb#229
    def empty?(*args, **_arg1, &block); end

    # source://searchkick//lib/searchkick/results.rb#77
    def entry_name(options = T.unsafe(nil)); end

    # source://searchkick//lib/searchkick/results.rb#65
    def error; end

    # @return [Boolean]
    #
    # source://searchkick//lib/searchkick/results.rb#130
    def first_page?; end

    # source://searchkick//lib/searchkick/results.rb#150
    def highlights(multiple: T.unsafe(nil)); end

    # source://searchkick//lib/searchkick/results.rb#142
    def hits; end

    # Returns the value of attribute klass.
    #
    # source://searchkick//lib/searchkick/results.rb#6
    def klass; end

    # @return [Boolean]
    #
    # source://searchkick//lib/searchkick/results.rb#134
    def last_page?; end

    # source://forwardable/1.3.2/forwardable.rb#229
    def length(*args, **_arg1, &block); end

    # source://searchkick//lib/searchkick/results.rb#102
    def limit_value; end

    # source://searchkick//lib/searchkick/results.rb#28
    def missing_records; end

    # @return [Boolean]
    #
    # source://searchkick//lib/searchkick/results.rb#172
    def misspellings?; end

    # source://searchkick//lib/searchkick/results.rb#69
    def model_name; end

    # source://searchkick//lib/searchkick/results.rb#126
    def next_page; end

    # source://searchkick//lib/searchkick/results.rb#111
    def num_pages; end

    # source://searchkick//lib/searchkick/results.rb#116
    def offset_value; end

    # Returns the value of attribute options.
    #
    # source://searchkick//lib/searchkick/results.rb#6
    def options; end

    # @return [Boolean]
    #
    # source://searchkick//lib/searchkick/results.rb#138
    def out_of_range?; end

    # source://searchkick//lib/searchkick/results.rb#107
    def padding; end

    # source://searchkick//lib/searchkick/results.rb#121
    def prev_page; end

    # source://searchkick//lib/searchkick/results.rb#121
    def previous_page; end

    # Returns the value of attribute response.
    #
    # source://searchkick//lib/searchkick/results.rb#6
    def response; end

    # source://searchkick//lib/searchkick/results.rb#16
    def results; end

    # @raise [Error]
    #
    # source://searchkick//lib/searchkick/results.rb#180
    def scroll; end

    # source://searchkick//lib/searchkick/results.rb#176
    def scroll_id; end

    # source://forwardable/1.3.2/forwardable.rb#229
    def size(*args, **_arg1, &block); end

    # source://forwardable/1.3.2/forwardable.rb#229
    def slice(*args, **_arg1, &block); end

    # source://searchkick//lib/searchkick/results.rb#32
    def suggestions; end

    # source://forwardable/1.3.2/forwardable.rb#229
    def to_ary(*args, **_arg1, &block); end

    # source://searchkick//lib/searchkick/results.rb#61
    def took; end

    # source://searchkick//lib/searchkick/results.rb#87
    def total_count; end

    # source://searchkick//lib/searchkick/results.rb#87
    def total_entries; end

    # source://searchkick//lib/searchkick/results.rb#111
    def total_pages; end

    # source://searchkick//lib/searchkick/results.rb#156
    def with_highlights(multiple: T.unsafe(nil)); end

    # source://searchkick//lib/searchkick/results.rb#20
    def with_hit; end

    # source://searchkick//lib/searchkick/results.rb#164
    def with_score; end
  end
end

class ActiveRecord::Base
  extend Searchkick::Model
end
