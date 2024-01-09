# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `mini_histogram` gem.
# Please instead update this file by running `bin/tapioca gem mini_histogram`.

# A class for building histogram info
#
# Given an array, this class calculates the "edges" of a histogram
# these edges mark the boundries for "bins"
#
#   array = [1,1,1, 5, 5, 5, 5, 10, 10, 10]
#   histogram = MiniHistogram.new(array)
#   puts histogram.edges
#   # => [0.0, 2.0, 4.0, 6.0, 8.0, 10.0, 12.0]
#
# It also finds the weights (aka count of values) that would go in each bin:
#
#   puts histogram.weights
#   # => [3, 0, 4, 0, 0, 3]
#
# This means that the `array` here had three items between 0.0 and 2.0.
#
# source://mini_histogram//lib/mini_histogram/version.rb#1
class MiniHistogram
  # @return [MiniHistogram] a new instance of MiniHistogram
  #
  # source://mini_histogram//lib/mini_histogram.rb#24
  def initialize(array, left_p: T.unsafe(nil), edges: T.unsafe(nil)); end

  # Returns the value of attribute array.
  #
  # source://mini_histogram//lib/mini_histogram.rb#22
  def array; end

  # source://mini_histogram//lib/mini_histogram.rb#57
  def bin_size; end

  # source://mini_histogram//lib/mini_histogram.rb#45
  def closed; end

  # Finds the "edges" of a given histogram that will mark the boundries
  # for the histogram's "bins"
  #
  # Example:
  #
  #  a = [1,1,1, 5, 5, 5, 5, 10, 10, 10]
  #  MiniHistogram.new(a).edges
  #  # => [0.0, 2.0, 4.0, 6.0, 8.0, 10.0, 12.0]
  #
  #  There are multiple ways to find edges, this was taken from
  #  https://github.com/mrkn/enumerable-statistics/issues/24
  #
  #  Another good set of implementations is in numpy
  #  https://github.com/numpy/numpy/blob/d9b1e32cb8ef90d6b4a47853241db2a28146a57d/numpy/lib/histograms.py#L222
  #
  # source://mini_histogram//lib/mini_histogram.rb#122
  def edge; end

  # Finds the "edges" of a given histogram that will mark the boundries
  # for the histogram's "bins"
  #
  # Example:
  #
  #  a = [1,1,1, 5, 5, 5, 5, 10, 10, 10]
  #  MiniHistogram.new(a).edges
  #  # => [0.0, 2.0, 4.0, 6.0, 8.0, 10.0, 12.0]
  #
  #  There are multiple ways to find edges, this was taken from
  #  https://github.com/mrkn/enumerable-statistics/issues/24
  #
  #  Another good set of implementations is in numpy
  #  https://github.com/numpy/numpy/blob/d9b1e32cb8ef90d6b4a47853241db2a28146a57d/numpy/lib/histograms.py#L222
  #
  # source://mini_histogram//lib/mini_histogram.rb#122
  def edges; end

  # source://mini_histogram//lib/mini_histogram.rb#37
  def edges_max; end

  # source://mini_histogram//lib/mini_histogram.rb#33
  def edges_min; end

  # source://mini_histogram//lib/mini_histogram.rb#41
  def histogram(*_); end

  # Returns the value of attribute left_p.
  #
  # source://mini_histogram//lib/mini_histogram.rb#22
  def left_p; end

  # Returns the value of attribute max.
  #
  # source://mini_histogram//lib/mini_histogram.rb#22
  def max; end

  # source://mini_histogram//lib/mini_histogram/plot.rb#80
  def plot(nbins: T.unsafe(nil), closed: T.unsafe(nil), symbol: T.unsafe(nil), **kw); end

  # Weird name, right? There are multiple ways to
  # calculate the number of "bins" a histogram should have, one
  # of the most common is the "sturges" method
  #
  # Here are some alternatives from numpy:
  # https://github.com/numpy/numpy/blob/d9b1e32cb8ef90d6b4a47853241db2a28146a57d/numpy/lib/histograms.py#L489-L521
  #
  # source://mini_histogram//lib/mini_histogram.rb#69
  def sturges; end

  # Sets the edge value to something new,
  # also clears any previously calculated values
  #
  # source://mini_histogram//lib/mini_histogram.rb#51
  def update_values(edges:, max:); end

  # Given an array of edges and an array we want to generate a histogram from
  # return the counts for each "bin"
  #
  # Example:
  #
  #   a = [1,1,1, 5, 5, 5, 5, 10, 10, 10]
  #   edges = [0.0, 2.0, 4.0, 6.0, 8.0, 10.0, 12.0]
  #
  #   MiniHistogram.new(a).weights
  #   # => [3, 0, 4, 0, 0, 3]
  #
  #   This means that the `a` array has 3 values between 0.0 and 2.0
  #   4 values between 4.0 and 6.0 and three values between 10.0 and 12.0
  #
  # source://mini_histogram//lib/mini_histogram.rb#90
  def weights; end

  private

  # Begin copy/pasta from unicode_plot.rb with some slight modifications
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#125
  def barplot(*args, width: T.unsafe(nil), color: T.unsafe(nil), symbol: T.unsafe(nil), border: T.unsafe(nil), xscale: T.unsafe(nil), xlabel: T.unsafe(nil), data: T.unsafe(nil), **kw); end

  # source://mini_histogram//lib/mini_histogram/plot.rb#175
  def ceil_neg_log10(x); end

  # source://mini_histogram//lib/mini_histogram/plot.rb#165
  def float_round_log10(x, m); end

  # @return [Boolean]
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#185
  def roundable?(x); end

  class << self
    # @yield [a, b]
    #
    # source://mini_histogram//lib/mini_histogram/plot.rb#66
    def dual_plot; end

    # Given an array of Histograms this function calcualtes
    # an average edge size along with the minimum and maximum
    # edge values. It then updates the edge value on all inputs
    #
    # The main pourpose of this method is to be able to chart multiple
    # distributions against a similar axis
    #
    # See for more context: https://github.com/schneems/derailed_benchmarks/pull/169
    #
    # source://mini_histogram//lib/mini_histogram.rb#213
    def set_average_edges!(*array_of_histograms); end
  end
end

# source://mini_histogram//lib/mini_histogram.rb#21
class MiniHistogram::Error < ::StandardError; end

# source://mini_histogram//lib/mini_histogram/plot.rb#184
MiniHistogram::INT64_MAX = T.let(T.unsafe(nil), Integer)

# source://mini_histogram//lib/mini_histogram/plot.rb#183
MiniHistogram::INT64_MIN = T.let(T.unsafe(nil), Integer)

# source://mini_histogram//lib/mini_histogram/plot.rb#189
module MiniHistogram::MiniUnicodePlot; end

# source://mini_histogram//lib/mini_histogram/plot.rb#268
MiniHistogram::MiniUnicodePlot::BORDER_MAP = T.let(T.unsafe(nil), Hash)

# source://mini_histogram//lib/mini_histogram/plot.rb#713
class MiniHistogram::MiniUnicodePlot::Barplot < ::MiniHistogram::MiniUnicodePlot::Plot
  include ::MiniHistogram::MiniUnicodePlot::ValueTransformer

  # @return [Barplot] a new instance of Barplot
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#720
  def initialize(bars, width, color, symbol, transform, **kw); end

  # source://mini_histogram//lib/mini_histogram/plot.rb#747
  def add_row!(bars); end

  # Returns the value of attribute max_freq.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#735
  def max_freq; end

  # Returns the value of attribute max_len.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#736
  def max_len; end

  # source://mini_histogram//lib/mini_histogram/plot.rb#743
  def n_columns; end

  # source://mini_histogram//lib/mini_histogram/plot.rb#739
  def n_rows; end

  # source://mini_histogram//lib/mini_histogram/plot.rb#753
  def print_row(out, row_index); end

  # Returns the value of attribute width.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#737
  def width; end

  private

  # source://mini_histogram//lib/mini_histogram/plot.rb#770
  def find_max(values); end
end

# source://mini_histogram//lib/mini_histogram/plot.rb#717
MiniHistogram::MiniUnicodePlot::Barplot::DEFAULT_COLOR = T.let(T.unsafe(nil), Symbol)

# source://mini_histogram//lib/mini_histogram/plot.rb#718
MiniHistogram::MiniUnicodePlot::Barplot::DEFAULT_SYMBOL = T.let(T.unsafe(nil), String)

# source://mini_histogram//lib/mini_histogram/plot.rb#716
MiniHistogram::MiniUnicodePlot::Barplot::MIN_WIDTH = T.let(T.unsafe(nil), Integer)

# source://mini_histogram//lib/mini_histogram/plot.rb#233
module MiniHistogram::MiniUnicodePlot::BorderMaps; end

# source://mini_histogram//lib/mini_histogram/plot.rb#256
MiniHistogram::MiniUnicodePlot::BorderMaps::BORDER_BARPLOT = T.let(T.unsafe(nil), Hash)

# source://mini_histogram//lib/mini_histogram/plot.rb#245
MiniHistogram::MiniUnicodePlot::BorderMaps::BORDER_CORNERS = T.let(T.unsafe(nil), Hash)

# source://mini_histogram//lib/mini_histogram/plot.rb#234
MiniHistogram::MiniUnicodePlot::BorderMaps::BORDER_SOLID = T.let(T.unsafe(nil), Hash)

# source://mini_histogram//lib/mini_histogram/plot.rb#364
module MiniHistogram::MiniUnicodePlot::BorderPrinter
  include ::MiniHistogram::MiniUnicodePlot::StyledPrinter

  # source://mini_histogram//lib/mini_histogram/plot.rb#373
  def print_border_bottom(out, padding, length, border = T.unsafe(nil), color: T.unsafe(nil)); end

  # source://mini_histogram//lib/mini_histogram/plot.rb#367
  def print_border_top(out, padding, length, border = T.unsafe(nil), color: T.unsafe(nil)); end
end

# source://mini_histogram//lib/mini_histogram/plot.rb#568
class MiniHistogram::MiniUnicodePlot::Plot
  include ::MiniHistogram::MiniUnicodePlot::StyledPrinter

  # @return [Plot] a new instance of Plot
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#576
  def initialize(title: T.unsafe(nil), xlabel: T.unsafe(nil), ylabel: T.unsafe(nil), border: T.unsafe(nil), margin: T.unsafe(nil), padding: T.unsafe(nil), labels: T.unsafe(nil)); end

  # source://mini_histogram//lib/mini_histogram/plot.rb#632
  def annotate!(loc, value, color: T.unsafe(nil)); end

  # source://mini_histogram//lib/mini_histogram/plot.rb#659
  def annotate_row!(loc, row_index, value, color: T.unsafe(nil)); end

  # Returns the value of attribute border.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#602
  def border; end

  # Returns the value of attribute colors_deco.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#610
  def colors_deco; end

  # Returns the value of attribute colors_left.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#606
  def colors_left; end

  # Returns the value of attribute colors_right.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#608
  def colors_right; end

  # Returns the value of attribute decorations.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#609
  def decorations; end

  # Returns the value of attribute labels_left.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#605
  def labels_left; end

  # Returns the value of attribute labels_right.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#607
  def labels_right; end

  # Returns the value of attribute margin.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#603
  def margin; end

  # source://mini_histogram//lib/mini_histogram/plot.rb#685
  def next_color; end

  # Returns the value of attribute padding.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#604
  def padding; end

  # source://mini_histogram//lib/mini_histogram/plot.rb#672
  def render(out); end

  # @return [Boolean]
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#628
  def show_labels?; end

  # Returns the value of attribute title.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#599
  def title; end

  # @return [Boolean]
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#612
  def title_given?; end

  # source://mini_histogram//lib/mini_histogram/plot.rb#691
  def to_s; end

  # Returns the value of attribute xlabel.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#600
  def xlabel; end

  # @return [Boolean]
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#616
  def xlabel_given?; end

  # Returns the value of attribute ylabel.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#601
  def ylabel; end

  # @return [Boolean]
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#620
  def ylabel_given?; end

  # source://mini_histogram//lib/mini_histogram/plot.rb#624
  def ylabel_length; end

  private

  # source://mini_histogram//lib/mini_histogram/plot.rb#699
  def check_margin(margin); end

  # source://mini_histogram//lib/mini_histogram/plot.rb#706
  def check_row_index(row_index); end
end

# source://mini_histogram//lib/mini_histogram/plot.rb#676
MiniHistogram::MiniUnicodePlot::Plot::COLOR_CYCLE = T.let(T.unsafe(nil), Array)

# source://mini_histogram//lib/mini_histogram/plot.rb#572
MiniHistogram::MiniUnicodePlot::Plot::DEFAULT_BORDER = T.let(T.unsafe(nil), Symbol)

# source://mini_histogram//lib/mini_histogram/plot.rb#573
MiniHistogram::MiniUnicodePlot::Plot::DEFAULT_MARGIN = T.let(T.unsafe(nil), Integer)

# source://mini_histogram//lib/mini_histogram/plot.rb#574
MiniHistogram::MiniUnicodePlot::Plot::DEFAULT_PADDING = T.let(T.unsafe(nil), Integer)

# source://mini_histogram//lib/mini_histogram/plot.rb#571
MiniHistogram::MiniUnicodePlot::Plot::DEFAULT_WIDTH = T.let(T.unsafe(nil), Integer)

# source://mini_histogram//lib/mini_histogram/plot.rb#380
class MiniHistogram::MiniUnicodePlot::Renderer
  include ::MiniHistogram::MiniUnicodePlot::StyledPrinter
  include ::MiniHistogram::MiniUnicodePlot::BorderPrinter

  # @return [Renderer] a new instance of Renderer
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#387
  def initialize(plot); end

  # Returns the value of attribute out.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#393
  def out; end

  # Returns the value of attribute plot.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#392
  def plot; end

  # source://mini_histogram//lib/mini_histogram/plot.rb#395
  def render(out); end

  private

  # source://mini_histogram//lib/mini_histogram/plot.rb#519
  def init_render; end

  # source://mini_histogram//lib/mini_histogram/plot.rb#563
  def nocolor_string(str); end

  # source://mini_histogram//lib/mini_histogram/plot.rb#555
  def print(*args); end

  # source://mini_histogram//lib/mini_histogram/plot.rb#547
  def print_title(padding, title, p_width: T.unsafe(nil), color: T.unsafe(nil)); end

  # source://mini_histogram//lib/mini_histogram/plot.rb#559
  def puts(*args); end

  # source://mini_histogram//lib/mini_histogram/plot.rb#487
  def render_bottom; end

  # source://mini_histogram//lib/mini_histogram/plot.rb#442
  def render_row(row); end

  # render all rows
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#438
  def render_rows; end

  # source://mini_histogram//lib/mini_histogram/plot.rb#406
  def render_top; end

  class << self
    # source://mini_histogram//lib/mini_histogram/plot.rb#383
    def render(out, plot); end
  end
end

# source://mini_histogram//lib/mini_histogram/plot.rb#274
module MiniHistogram::MiniUnicodePlot::StyledPrinter
  # @return [Boolean]
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#359
  def color?(out); end

  # source://mini_histogram//lib/mini_histogram/plot.rb#354
  def print_color(out, color, *args); end

  # source://mini_histogram//lib/mini_histogram/plot.rb#332
  def print_styled(out, *args, bold: T.unsafe(nil), color: T.unsafe(nil)); end
end

# source://mini_histogram//lib/mini_histogram/plot.rb#330
MiniHistogram::MiniUnicodePlot::StyledPrinter::COLOR_DECODE = T.let(T.unsafe(nil), Hash)

# source://mini_histogram//lib/mini_histogram/plot.rb#319
MiniHistogram::MiniUnicodePlot::StyledPrinter::COLOR_ENCODE = T.let(T.unsafe(nil), Hash)

# source://mini_histogram//lib/mini_histogram/plot.rb#308
MiniHistogram::MiniUnicodePlot::StyledPrinter::DISABLE_TEXT_STYLE = T.let(T.unsafe(nil), Hash)

# source://mini_histogram//lib/mini_histogram/plot.rb#275
MiniHistogram::MiniUnicodePlot::StyledPrinter::TEXT_COLORS = T.let(T.unsafe(nil), Hash)

# source://mini_histogram//lib/mini_histogram/plot.rb#190
module MiniHistogram::MiniUnicodePlot::ValueTransformer
  # source://mini_histogram//lib/mini_histogram/plot.rb#200
  def transform_values(func, values); end

  private

  # source://mini_histogram//lib/mini_histogram/plot.rb#218
  def transform_name(func, basename = T.unsafe(nil)); end

  class << self
    # source://mini_histogram//lib/mini_histogram/plot.rb#218
    def transform_name(func, basename = T.unsafe(nil)); end
  end
end

# source://mini_histogram//lib/mini_histogram/plot.rb#191
MiniHistogram::MiniUnicodePlot::ValueTransformer::PREDEFINED_TRANSFORM_FUNCTIONS = T.let(T.unsafe(nil), Hash)

# This is an object that holds a histogram
# and it's corresponding plot options
#
# Example:
#
#   x = PlotValue.new
#   x.values = [1,2,3,4,5]
#   x.options = {xlabel: "random"}
#
#   x.plot # => Generates a histogram plot with these values and options
#
# source://mini_histogram//lib/mini_histogram/plot.rb#31
class MiniHistogram::PlotValue
  # @return [PlotValue] a new instance of PlotValue
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#34
  def initialize; end

  # Returns the value of attribute histogram.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#32
  def histogram; end

  # Sets the attribute histogram
  #
  # @param value the value to set the attribute histogram to.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#32
  def histogram=(_arg0); end

  # Returns the value of attribute options.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#32
  def options; end

  # Sets the attribute options
  #
  # @param value the value to set the attribute options to.
  #
  # source://mini_histogram//lib/mini_histogram/plot.rb#32
  def options=(_arg0); end

  # source://mini_histogram//lib/mini_histogram/plot.rb#39
  def plot; end

  # source://mini_histogram//lib/mini_histogram/plot.rb#45
  def values=(values); end

  class << self
    # source://mini_histogram//lib/mini_histogram/plot.rb#49
    def dual_plot(plot_a, plot_b); end
  end
end

# source://mini_histogram//lib/mini_histogram/version.rb#2
MiniHistogram::VERSION = T.let(T.unsafe(nil), String)
