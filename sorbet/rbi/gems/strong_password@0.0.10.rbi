# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `strong_password` gem.
# Please instead update this file by running `bin/tapioca gem strong_password`.

# source://strong_password//lib/active_model/validations/password_strength_validator.rb#3
module ActiveModel
  class << self
    # source://activemodel/7.0.6/lib/active_model.rb#72
    def eager_load!; end

    # source://activemodel/7.0.6/lib/active_model/gem_version.rb#5
    def gem_version; end

    # source://activemodel/7.0.6/lib/active_model/version.rb#7
    def version; end
  end
end

# source://strong_password//lib/active_model/validations/password_strength_validator.rb#4
module ActiveModel::Validations
  include GeneratedInstanceMethods
  include ::ActiveSupport::Callbacks
  include ::ActiveModel::Validations::HelperMethods

  mixes_in_class_methods GeneratedClassMethods
  mixes_in_class_methods ::ActiveModel::Validations::ClassMethods
  mixes_in_class_methods ::ActiveModel::Callbacks
  mixes_in_class_methods ::ActiveSupport::Callbacks::ClassMethods
  mixes_in_class_methods ::ActiveSupport::DescendantsTracker
  mixes_in_class_methods ::ActiveModel::Translation
  mixes_in_class_methods ::ActiveModel::Validations::HelperMethods

  # source://activemodel/7.0.6/lib/active_model/validations.rb#301
  def errors; end

  # source://activemodel/7.0.6/lib/active_model/validations.rb#373
  def invalid?(context = T.unsafe(nil)); end

  def read_attribute_for_validation(*_arg0); end

  # source://activemodel/7.0.6/lib/active_model/validations.rb#334
  def valid?(context = T.unsafe(nil)); end

  # source://activemodel/7.0.6/lib/active_model/validations.rb#334
  def validate(context = T.unsafe(nil)); end

  # source://activemodel/7.0.6/lib/active_model/validations.rb#382
  def validate!(context = T.unsafe(nil)); end

  # source://activemodel/7.0.6/lib/active_model/validations/with.rb#137
  def validates_with(*args, &block); end

  private

  # source://activemodel/7.0.6/lib/active_model/validations.rb#283
  def initialize_dup(other); end

  # source://activemodel/7.0.6/lib/active_model/validations.rb#410
  def raise_validation_error; end

  # source://activemodel/7.0.6/lib/active_model/validations.rb#405
  def run_validations!; end

  module GeneratedClassMethods
    def __callbacks; end
    def __callbacks=(value); end
    def __callbacks?; end
    def _validators; end
    def _validators=(value); end
    def _validators?; end
  end

  module GeneratedInstanceMethods
    def __callbacks; end
    def __callbacks?; end
    def _validators; end
    def _validators?; end
  end
end

# source://strong_password//lib/active_model/validations/password_strength_validator.rb#32
module ActiveModel::Validations::HelperMethods
  # source://activemodel/7.0.6/lib/active_model/validations/absence.rb#28
  def validates_absence_of(*attr_names); end

  # source://activemodel/7.0.6/lib/active_model/validations/acceptance.rb#108
  def validates_acceptance_of(*attr_names); end

  # source://activemodel/7.0.6/lib/active_model/validations/comparison.rb#77
  def validates_comparison_of(*attr_names); end

  # source://activemodel/7.0.6/lib/active_model/validations/confirmation.rb#75
  def validates_confirmation_of(*attr_names); end

  # source://date_validator/0.12.0/lib/active_model/validations/date_validator.rb#126
  def validates_date_of(*attr_names); end

  # source://activemodel/7.0.6/lib/active_model/validations/exclusion.rb#44
  def validates_exclusion_of(*attr_names); end

  # source://activemodel/7.0.6/lib/active_model/validations/format.rb#108
  def validates_format_of(*attr_names); end

  # source://activemodel/7.0.6/lib/active_model/validations/inclusion.rb#42
  def validates_inclusion_of(*attr_names); end

  # source://activemodel/7.0.6/lib/active_model/validations/length.rb#121
  def validates_length_of(*attr_names); end

  # source://activemodel/7.0.6/lib/active_model/validations/numericality.rb#205
  def validates_numericality_of(*attr_names); end

  # class User < ActiveRecord::Base
  #     validates_password_strength :password
  #     validates_password_strength :password, extra_dictionary_words: :extra_words
  #   end
  #
  # source://strong_password//lib/active_model/validations/password_strength_validator.rb#38
  def validates_password_strength(*attr_names); end

  # source://activemodel/7.0.6/lib/active_model/validations/presence.rb#34
  def validates_presence_of(*attr_names); end

  # source://activemodel/7.0.6/lib/active_model/validations/length.rb#121
  def validates_size_of(*attr_names); end

  private

  # source://activemodel/7.0.6/lib/active_model/validations/helper_methods.rb#7
  def _merge_attributes(attr_names); end
end

# source://strong_password//lib/active_model/validations/password_strength_validator.rb#5
class ActiveModel::Validations::PasswordStrengthValidator < ::ActiveModel::EachValidator
  # source://strong_password//lib/active_model/validations/password_strength_validator.rb#19
  def extra_words_for_object(extra_words, object); end

  # source://strong_password//lib/active_model/validations/password_strength_validator.rb#13
  def strength_options(options, object); end

  # source://strong_password//lib/active_model/validations/password_strength_validator.rb#6
  def validate_each(object, attribute, value); end
end

# source://strong_password//lib/strong_password/version.rb#1
module StrongPassword; end

# source://strong_password//lib/strong_password/dictionary_adjuster.rb#2
class StrongPassword::DictionaryAdjuster
  # @return [DictionaryAdjuster] a new instance of DictionaryAdjuster
  #
  # source://strong_password//lib/strong_password/dictionary_adjuster.rb#972
  def initialize(min_entropy: T.unsafe(nil), min_word_length: T.unsafe(nil), extra_dictionary_words: T.unsafe(nil)); end

  # Returns the minimum entropy for the passwords dictionary adjustments.
  # If a threshhold is specified we will bail early to avoid unnecessary
  # processing.
  # Note that we only check for the first matching word up to the threshhold if set.
  # Subsequent matching words are not deductd.
  #
  # source://strong_password//lib/strong_password/dictionary_adjuster.rb#991
  def adjusted_entropy(password); end

  # source://strong_password//lib/strong_password/dictionary_adjuster.rb#1000
  def dictionary_words; end

  # Returns the value of attribute extra_dictionary_words.
  #
  # source://strong_password//lib/strong_password/dictionary_adjuster.rb#970
  def extra_dictionary_words; end

  # @return [Boolean]
  #
  # source://strong_password//lib/strong_password/dictionary_adjuster.rb#978
  def is_strong?(password); end

  # @return [Boolean]
  #
  # source://strong_password//lib/strong_password/dictionary_adjuster.rb#982
  def is_weak?(password); end

  # Returns the value of attribute min_entropy.
  #
  # source://strong_password//lib/strong_password/dictionary_adjuster.rb#970
  def min_entropy; end

  # Returns the value of attribute min_word_length.
  #
  # source://strong_password//lib/strong_password/dictionary_adjuster.rb#970
  def min_word_length; end
end

# source://strong_password//lib/strong_password/dictionary_adjuster.rb#3
StrongPassword::DictionaryAdjuster::COMMON_PASSWORDS = T.let(T.unsafe(nil), Array)

# source://strong_password//lib/strong_password/entropy_calculator.rb#2
module StrongPassword::EntropyCalculator
  class << self
    # source://strong_password//lib/strong_password/entropy_calculator.rb#42
    def bit_value_at_position(position, base = T.unsafe(nil)); end

    # The basic NIST entropy calculation is based solely
    # on the length of the password in question.
    #
    # source://strong_password//lib/strong_password/entropy_calculator.rb#14
    def bits(password); end

    # A modified version of the basic entropy calculation
    # which lowers the amount of entropy gained for each
    # repeated character in the password
    #
    # source://strong_password//lib/strong_password/entropy_calculator.rb#31
    def bits_with_repeats_weakened(password); end

    # Calculates NIST entropy for a password.
    #
    # source://strong_password//lib/strong_password/entropy_calculator.rb#4
    def calculate(password, repeats_weakened = T.unsafe(nil)); end
  end
end

# source://strong_password//lib/strong_password/entropy_calculator.rb#54
class StrongPassword::EntropyCalculator::EntropyResolver
  # @return [EntropyResolver] a new instance of EntropyResolver
  #
  # source://strong_password//lib/strong_password/entropy_calculator.rb#60
  def initialize; end

  # Returns the value of attribute char_multiplier.
  #
  # source://strong_password//lib/strong_password/entropy_calculator.rb#58
  def char_multiplier; end

  # Returns the current entropy value for a character and weakens the entropy
  # for future calls for the same character.
  #
  # source://strong_password//lib/strong_password/entropy_calculator.rb#66
  def entropy_for(char); end
end

# source://strong_password//lib/strong_password/entropy_calculator.rb#55
StrongPassword::EntropyCalculator::EntropyResolver::BASE_VALUE = T.let(T.unsafe(nil), Integer)

# source://strong_password//lib/strong_password/entropy_calculator.rb#56
StrongPassword::EntropyCalculator::EntropyResolver::REPEAT_WEAKENING_FACTOR = T.let(T.unsafe(nil), Float)

# source://strong_password//lib/strong_password/nist_bonus_bits.rb#2
module StrongPassword::NistBonusBits
  class << self
    # NIST password strength rules allow up to 6 bonus bits for mixed case and non-alphabetic
    #
    # source://strong_password//lib/strong_password/nist_bonus_bits.rb#6
    def bonus_bits(password); end

    # source://strong_password//lib/strong_password/nist_bonus_bits.rb#17
    def calculate_bonus_bits_for(password); end

    # This smells bad as it's only used for testing...
    #
    # source://strong_password//lib/strong_password/nist_bonus_bits.rb#13
    def reset_bonus_cache!; end
  end
end

# source://strong_password//lib/strong_password/password_variants.rb#2
module StrongPassword::PasswordVariants
  class << self
    # Returns all variants of a given password including the password itself
    #
    # source://strong_password//lib/strong_password/password_variants.rb#84
    def all_variants(password); end

    # Returns all keyboard shifted variants of a given password
    #
    # source://strong_password//lib/strong_password/password_variants.rb#92
    def keyboard_shift_variants(password); end

    # Returns all leet speak variants of a given password
    #
    # source://strong_password//lib/strong_password/password_variants.rb#100
    def leet_speak_variants(password); end

    # source://strong_password//lib/strong_password/password_variants.rb#109
    def variants(password, *mappings); end
  end
end

# source://strong_password//lib/strong_password/password_variants.rb#23
StrongPassword::PasswordVariants::BOTTOM_ROW_REGEXP = T.let(T.unsafe(nil), Regexp)

# source://strong_password//lib/strong_password/password_variants.rb#54
StrongPassword::PasswordVariants::KEYBOARDMAP_DOWNLEFT = T.let(T.unsafe(nil), Hash)

# source://strong_password//lib/strong_password/password_variants.rb#25
StrongPassword::PasswordVariants::KEYBOARDMAP_DOWNRIGHT = T.let(T.unsafe(nil), Hash)

# source://strong_password//lib/strong_password/password_variants.rb#5
StrongPassword::PasswordVariants::LEET_SPEAK = T.let(T.unsafe(nil), Hash)

# source://strong_password//lib/strong_password/password_variants.rb#21
StrongPassword::PasswordVariants::LEET_SPEAK_ALT = T.let(T.unsafe(nil), Hash)

# source://strong_password//lib/strong_password/password_variants.rb#3
StrongPassword::PasswordVariants::LEET_SPEAK_REGEXP = T.let(T.unsafe(nil), Regexp)

# source://strong_password//lib/strong_password/qwerty_adjuster.rb#2
class StrongPassword::QwertyAdjuster
  # @return [QwertyAdjuster] a new instance of QwertyAdjuster
  #
  # source://strong_password//lib/strong_password/qwerty_adjuster.rb#22
  def initialize(min_entropy: T.unsafe(nil), entropy_threshhold: T.unsafe(nil)); end

  # Returns the minimum entropy for the password's qwerty locality
  # adjustments.  If a threshhold is specified we will bail
  # early to avoid unnecessary processing.
  #
  # source://strong_password//lib/strong_password/qwerty_adjuster.rb#38
  def adjusted_entropy(base_password); end

  # Returns the value of attribute entropy_threshhold.
  #
  # source://strong_password//lib/strong_password/qwerty_adjuster.rb#20
  def entropy_threshhold; end

  # @return [Boolean]
  #
  # source://strong_password//lib/strong_password/qwerty_adjuster.rb#27
  def is_strong?(base_password); end

  # @return [Boolean]
  #
  # source://strong_password//lib/strong_password/qwerty_adjuster.rb#31
  def is_weak?(base_password); end

  # Returns the value of attribute min_entropy.
  #
  # source://strong_password//lib/strong_password/qwerty_adjuster.rb#20
  def min_entropy; end

  private

  # source://strong_password//lib/strong_password/qwerty_adjuster.rb#56
  def all_qwerty_strings; end

  # source://strong_password//lib/strong_password/qwerty_adjuster.rb#62
  def gen_qw_strings(qwerty_string); end

  # source://strong_password//lib/strong_password/qwerty_adjuster.rb#71
  def mask_qwerty_strings(password); end
end

# source://strong_password//lib/strong_password/qwerty_adjuster.rb#3
StrongPassword::QwertyAdjuster::QWERTY_STRINGS = T.let(T.unsafe(nil), Array)

# source://strong_password//lib/strong_password/strength_checker.rb#2
class StrongPassword::StrengthChecker
  # @return [StrengthChecker] a new instance of StrengthChecker
  #
  # source://strong_password//lib/strong_password/strength_checker.rb#9
  def initialize(min_entropy: T.unsafe(nil), use_dictionary: T.unsafe(nil), min_word_length: T.unsafe(nil), extra_dictionary_words: T.unsafe(nil)); end

  # source://strong_password//lib/strong_password/strength_checker.rb#32
  def calculate_entropy(password); end

  # Returns the value of attribute extra_dictionary_words.
  #
  # source://strong_password//lib/strong_password/strength_checker.rb#7
  def extra_dictionary_words; end

  # @return [Boolean]
  #
  # source://strong_password//lib/strong_password/strength_checker.rb#20
  def is_strong?(password); end

  # @return [Boolean]
  #
  # source://strong_password//lib/strong_password/strength_checker.rb#16
  def is_weak?(password); end

  # Returns the value of attribute min_entropy.
  #
  # source://strong_password//lib/strong_password/strength_checker.rb#7
  def min_entropy; end

  # Returns the value of attribute min_word_length.
  #
  # source://strong_password//lib/strong_password/strength_checker.rb#7
  def min_word_length; end

  # Returns the value of attribute use_dictionary.
  #
  # source://strong_password//lib/strong_password/strength_checker.rb#7
  def use_dictionary; end

  private

  # source://strong_password//lib/strong_password/strength_checker.rb#50
  def dictionary_adjuster; end

  # source://strong_password//lib/strong_password/strength_checker.rb#46
  def qwerty_adjuster; end
end

# source://strong_password//lib/strong_password/strength_checker.rb#3
StrongPassword::StrengthChecker::BASE_ENTROPY = T.let(T.unsafe(nil), Integer)

# source://strong_password//lib/strong_password/strength_checker.rb#5
StrongPassword::StrengthChecker::EXTRA_WORDS_LIMIT = T.let(T.unsafe(nil), Integer)

# source://strong_password//lib/strong_password/strength_checker.rb#4
StrongPassword::StrengthChecker::PASSWORD_LIMIT = T.let(T.unsafe(nil), Integer)

# source://strong_password//lib/strong_password/version.rb#2
StrongPassword::VERSION = T.let(T.unsafe(nil), String)
