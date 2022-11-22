# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `phonelib` gem.
# Please instead update this file by running `bin/tapioca gem phonelib`.

# Validator class for phone validations
#
# ==== Examples
#
# Validates that attribute is a valid phone number.
# If empty value passed for attribute it fails.
#
#   class Phone < ActiveRecord::Base
#     attr_accessible :number
#     validates :number, phone: true
#   end
#
# Validates that attribute is a possible phone number.
# If empty value passed for attribute it fails.
#
#   class Phone < ActiveRecord::Base
#     attr_accessible :number
#     validates :number, phone: { possible: true }
#   end
#
# Validates that attribute is a valid phone number.
# Empty value is allowed to be passed.
#
#   class Phone < ActiveRecord::Base
#     attr_accessible :number
#     validates :number, phone: { allow_blank: true }
#   end
#
# Validates that attribute is a valid phone number of specified type(s).
# It is also possible to check that attribute is a possible number of specified
# type(s). Symbol or array accepted.
#
#   class Phone < ActiveRecord::Base
#     attr_accessible :number, :mobile
#     validates :number, phone: { types: [:mobile, :fixed], allow_blank: true }
#     validates :mobile, phone: { possible: true, types: :mobile  }
#   end
#
# validates that phone is valid and it is from specified country or countries
#
#   class Phone < ActiveRecord::Base
#     attr_accessible :number
#     validates :number, phone: { countries: [:us, :ca] }
#   end
#
# Validates that attribute does not include an extension.
# The default setting is to allow extensions
#
#   class Phone < ActiveRecord::Base
#     attr_accessible :number
#     validates :number, phone: { extensions: false }
#   end
#
# source://phonelib//lib/validators/phone_validator3.rb#55
class PhoneValidator < ::ActiveModel::EachValidator
  include ::Phonelib::Core

  # Validation method
  #
  # source://phonelib//lib/validators/phone_validator3.rb#59
  def validate_each(record, attribute, value); end

  private

  # @private
  #
  # source://phonelib//lib/validators/phone_validator3.rb#126
  def countries; end

  # source://phonelib//lib/validators/phone_validator3.rb#70
  def message; end

  # @private
  #
  # source://phonelib//lib/validators/phone_validator3.rb#114
  def phone_countries; end

  # @private
  #
  # source://phonelib//lib/validators/phone_validator3.rb#104
  def phone_types; end

  # @return [Boolean]
  #
  # source://phonelib//lib/validators/phone_validator3.rb#74
  def phone_valid?; end

  # source://phonelib//lib/validators/phone_validator3.rb#93
  def specified_country(record); end

  # @private
  #
  # source://phonelib//lib/validators/phone_validator3.rb#120
  def types; end

  # @return [Boolean]
  #
  # source://phonelib//lib/validators/phone_validator3.rb#83
  def valid_country?; end

  # @return [Boolean]
  #
  # source://phonelib//lib/validators/phone_validator3.rb#88
  def valid_extensions?; end

  # @return [Boolean]
  #
  # source://phonelib//lib/validators/phone_validator3.rb#78
  def valid_types?; end
end

# main Phonelib module definition
#
# source://phonelib//lib/phonelib.rb#2
module Phonelib
  extend ::Phonelib::Core
end

# main module that includes all basic data and methods
#
# source://phonelib//lib/phonelib/core.rb#3
module Phonelib::Core
  # source://phonelib//lib/phonelib/core.rb#163
  def add_additional_regex(country, type, national_regex); end

  # source://phonelib//lib/phonelib/core.rb#184
  def additional_regexes; end

  # setter for data file to use
  #
  # source://phonelib//lib/phonelib/core.rb#154
  def additional_regexes=(data); end

  # getter method for default_country variable
  #
  # @return [String|nil] Default country set for parsing or nil
  #
  # source://phonelib//lib/phonelib/core.rb#34
  def default_country; end

  # setter method for default_country variable
  #
  # @param country [String|Symbol] default country ISO2 code used for parsing
  # @return [String|nil] Default country set for parsing or nil
  #
  # source://phonelib//lib/phonelib/core.rb#41
  def default_country=(country); end

  # source://phonelib//lib/phonelib/core.rb#172
  def dump_additional_regexes; end

  # getter method for extension_separate_symbols variable
  #
  # @return [String] Default extension separator symbols used for parsing
  #
  # source://phonelib//lib/phonelib/core.rb#66
  def extension_separate_symbols; end

  # setter method for extension_separate_symbols variable
  #
  # @param separator [String] extension separator symbols used for parsing
  # @return [String] Default extension separator symbols used for parsing
  #
  # source://phonelib//lib/phonelib/core.rb#73
  def extension_separate_symbols=(separator); end

  # getter method for extension_separator variable
  #
  # @return [String] Default extension separator used for formatting
  #
  # source://phonelib//lib/phonelib/core.rb#50
  def extension_separator; end

  # setter method for extension_separator variable
  #
  # @param separator [String] extension separator used for formatting
  # @return [String] Default extension separator used for formatting
  #
  # source://phonelib//lib/phonelib/core.rb#57
  def extension_separator=(separator); end

  # method checks if passed phone number is impossible
  #
  # @param phone_number [String] the phone number to be parsed
  # @return [Boolean] phone impossible or not
  #
  # source://phonelib//lib/phonelib/core.rb#402
  def impossible?(phone_number); end

  # method checks if passed phone number is invalid
  #
  # @param phone_number [String] the phone number to be parsed
  # @return [Boolean] phone invalid or not
  #
  # source://phonelib//lib/phonelib/core.rb#388
  def invalid?(phone_number); end

  # method checks if passed phone number is invalid for provided country
  #
  # @param phone_number [String] the phone number to be parsed
  # @param country [String] ISO2 country code for phone parsing
  # @return [Boolean] phone invalid for specified country or not
  #
  # source://phonelib//lib/phonelib/core.rb#418
  def invalid_for_country?(phone_number, country); end

  # source://phonelib//lib/phonelib/core.rb#148
  def override_phone_data; end

  # setter for data file to use
  #
  # source://phonelib//lib/phonelib/core.rb#144
  def override_phone_data=(file_path); end

  # method for parsing phone number.
  # On first run fills @@phone_data with data present in yaml file
  #
  # @param phone [String] the phone number to be parsed
  # @param passed_country [nil|String|Symbol] country for phone parsing
  # @return [Phonelib::Phone] parsed phone entity
  #
  # source://phonelib//lib/phonelib/core.rb#374
  def parse(phone, passed_country = T.unsafe(nil)); end

  # getter for flag for special phone types parsing
  #
  # @return [Boolean] Flag defines whether to parse special phone types
  #
  # source://phonelib//lib/phonelib/core.rb#83
  def parse_special; end

  # setter for flag for special phone types parsing
  #
  # @param special [Boolean] parse special phone types value
  # @return [Boolean] Flag defines whether to parse special phone types
  #
  # source://phonelib//lib/phonelib/core.rb#90
  def parse_special=(special); end

  # getter for phone data for other modules of gem, can be used outside
  #
  # @return [Hash] all data for phone parsing
  #
  # source://phonelib//lib/phonelib/core.rb#9
  def phone_data; end

  # @private getter for extended phone data
  #
  # source://phonelib//lib/phonelib/core.rb#25
  def phone_ext_data; end

  # @private getter for phone regexp cache (internal use only)
  #
  # source://phonelib//lib/phonelib/core.rb#17
  def phone_regexp_cache; end

  # method checks if passed phone number is possible
  #
  # @param phone_number [String] the phone number to be parsed
  # @return [Boolean] phone possible or not
  #
  # source://phonelib//lib/phonelib/core.rb#395
  def possible?(phone_number); end

  # getter for sanitize regex
  #
  # @return [String] regex of symbols to wipe from parsed number
  #
  # source://phonelib//lib/phonelib/core.rb#115
  def sanitize_regex; end

  # setter for sanitize regex
  #
  # @param regex [String] symbols to wipe from parsed number
  # @return [String] regex of symbols to wipe from parsed number
  #
  # source://phonelib//lib/phonelib/core.rb#122
  def sanitize_regex=(regex); end

  # getter for strict check flag
  #
  # @return [Boolean] Flag defines whether to do strict parsing check
  #
  # source://phonelib//lib/phonelib/core.rb#99
  def strict_check; end

  # setter for strict check flag
  #
  # @param strict [Boolean] make a strict parsing or not
  # @return [Boolean] Flag defines whether to do strict parsing check
  #
  # source://phonelib//lib/phonelib/core.rb#106
  def strict_check=(strict); end

  # getter for strict double prefix check flag
  #
  # @return [Boolean] Flag defines whether to do strict double prefix parsing check
  #
  # source://phonelib//lib/phonelib/core.rb#131
  def strict_double_prefix_check; end

  # setter for strict double prefix check flag
  #
  # @param strict [Boolean] make a strict double prefix parsing or not
  # @return [Boolean] Flag defines whether to do strict double prefix parsing check
  #
  # source://phonelib//lib/phonelib/core.rb#138
  def strict_double_prefix_check=(strict); end

  # method checks if passed phone number is valid
  #
  # @param phone_number [String] the phone number to be parsed
  # @return [Boolean] phone valid or not
  #
  # source://phonelib//lib/phonelib/core.rb#381
  def valid?(phone_number); end

  # method checks if passed phone number is valid for provided country
  #
  # @param phone_number [String] the phone number to be parsed
  # @param country [String] ISO2 country code for phone parsing
  # @return [Boolean] phone valid for specified country or not
  #
  # source://phonelib//lib/phonelib/core.rb#410
  def valid_for_country?(phone_number, country); end

  # source://phonelib//lib/phonelib/core.rb#194
  def vanity_conversion; end

  # setter for vanity phone numbers chars replacement
  #
  # source://phonelib//lib/phonelib/core.rb#190
  def vanity_conversion=(value); end

  private

  # @private Load data file into memory
  #
  # source://phonelib//lib/phonelib/core.rb#425
  def load_data; end

  # @private Load extended data file into memory
  #
  # source://phonelib//lib/phonelib/core.rb#451
  def load_ext_data; end
end

# @private Area code countries for mobile type
#
# source://phonelib//lib/phonelib/core.rb#303
Phonelib::Core::AREA_CODE_MOBILE_COUNTRIES = T.let(T.unsafe(nil), Array)

# @private Area code mobile phone token
#
# source://phonelib//lib/phonelib/core.rb#306
Phonelib::Core::AREA_CODE_MOBILE_TOKENS = T.let(T.unsafe(nil), Hash)

# @private area code optional type
#
# source://phonelib//lib/phonelib/core.rb#259
Phonelib::Core::AREA_CODE_OPTIONAL = T.let(T.unsafe(nil), Symbol)

# @private Area code possible types
#
# source://phonelib//lib/phonelib/core.rb#300
Phonelib::Core::AREA_CODE_TYPES = T.let(T.unsafe(nil), Array)

# @private carrier selection codes
#
# source://phonelib//lib/phonelib/core.rb#257
Phonelib::Core::CARRIER_SELECTION_CODES = T.let(T.unsafe(nil), Symbol)

# @private carrier services type
#
# source://phonelib//lib/phonelib/core.rb#251
Phonelib::Core::CARRIER_SERVICES = T.let(T.unsafe(nil), Symbol)

# @private carrier specific type
#
# source://phonelib//lib/phonelib/core.rb#243
Phonelib::Core::CARRIER_SPECIFIC = T.let(T.unsafe(nil), Symbol)

# @private Country code key
#
# source://phonelib//lib/phonelib/core.rb#275
Phonelib::Core::COUNTRY_CODE = T.let(T.unsafe(nil), Symbol)

# @private Default number formatting data hash
#
# source://phonelib//lib/phonelib/core.rb#312
Phonelib::Core::DEFAULT_NUMBER_FORMAT = T.let(T.unsafe(nil), Hash)

# @private directory services
#
# source://phonelib//lib/phonelib/core.rb#253
Phonelib::Core::DIRECTORY_SERVICES = T.let(T.unsafe(nil), Symbol)

# @private Double country prefix flag key
#
# source://phonelib//lib/phonelib/core.rb#283
Phonelib::Core::DOUBLE_COUNTRY_PREFIX_FLAG = T.let(T.unsafe(nil), Symbol)

# @private emergency numbers
#
# source://phonelib//lib/phonelib/core.rb#241
Phonelib::Core::EMERGENCY = T.let(T.unsafe(nil), Symbol)

# @private expendad emergency type
#
# source://phonelib//lib/phonelib/core.rb#247
Phonelib::Core::EXPANDED_EMERGENCY = T.let(T.unsafe(nil), Symbol)

# @private Extended data carriers array key
#
# source://phonelib//lib/phonelib/core.rb#361
Phonelib::Core::EXT_CARRIERS = T.let(T.unsafe(nil), Symbol)

# @private Extended data key for carrier in prefixes hash
#
# source://phonelib//lib/phonelib/core.rb#367
Phonelib::Core::EXT_CARRIER_KEY = T.let(T.unsafe(nil), Symbol)

# @private Extended data country names array key
#
# source://phonelib//lib/phonelib/core.rb#357
Phonelib::Core::EXT_COUNTRY_NAMES = T.let(T.unsafe(nil), Symbol)

# @private Extended data geo names array key
#
# source://phonelib//lib/phonelib/core.rb#355
Phonelib::Core::EXT_GEO_NAMES = T.let(T.unsafe(nil), Symbol)

# @private Extended data key for geoname in prefixes hash
#
# source://phonelib//lib/phonelib/core.rb#363
Phonelib::Core::EXT_GEO_NAME_KEY = T.let(T.unsafe(nil), Symbol)

# @private Extended data prefixes hash key
#
# source://phonelib//lib/phonelib/core.rb#353
Phonelib::Core::EXT_PREFIXES = T.let(T.unsafe(nil), Symbol)

# @private Extended data timezones array key
#
# source://phonelib//lib/phonelib/core.rb#359
Phonelib::Core::EXT_TIMEZONES = T.let(T.unsafe(nil), Symbol)

# @private Extended data key for timezone in prefixes hash
#
# source://phonelib//lib/phonelib/core.rb#365
Phonelib::Core::EXT_TIMEZONE_KEY = T.let(T.unsafe(nil), Symbol)

# @private Extended data file
#
# source://phonelib//lib/phonelib/core.rb#203
Phonelib::Core::FILE_EXT_DATA = T.let(T.unsafe(nil), String)

# @private Main data file
#
# source://phonelib//lib/phonelib/core.rb#201
Phonelib::Core::FILE_MAIN_DATA = T.let(T.unsafe(nil), String)

# @private Fixed line pattern key
#
# source://phonelib//lib/phonelib/core.rb#232
Phonelib::Core::FIXED_LINE = T.let(T.unsafe(nil), Symbol)

# @private In case MOBILE and FIXED patterns are the same,
#   this type is returned
#
# source://phonelib//lib/phonelib/core.rb#237
Phonelib::Core::FIXED_OR_MOBILE = T.let(T.unsafe(nil), Symbol)

# @private Formats key
#
# source://phonelib//lib/phonelib/core.rb#287
Phonelib::Core::FORMATS = T.let(T.unsafe(nil), Symbol)

# Validation patterns keys constants
#
# @private General pattern for country key
#
# source://phonelib//lib/phonelib/core.rb#209
Phonelib::Core::GENERAL = T.let(T.unsafe(nil), Symbol)

# @private International prefix key
#
# source://phonelib//lib/phonelib/core.rb#279
Phonelib::Core::INTERNATIONAL_PREFIX = T.let(T.unsafe(nil), Symbol)

# @private Leading digits key
#
# source://phonelib//lib/phonelib/core.rb#277
Phonelib::Core::LEADING_DIGITS = T.let(T.unsafe(nil), Symbol)

# @private Main country for code key
#
# source://phonelib//lib/phonelib/core.rb#281
Phonelib::Core::MAIN_COUNTRY_FOR_CODE = T.let(T.unsafe(nil), Symbol)

# @private Mobile phone number pattern key
#
# source://phonelib//lib/phonelib/core.rb#234
Phonelib::Core::MOBILE = T.let(T.unsafe(nil), Symbol)

# @private National prefix key
#
# source://phonelib//lib/phonelib/core.rb#267
Phonelib::Core::NATIONAL_PREFIX = T.let(T.unsafe(nil), Symbol)

# @private National prefix for parsing key
#
# source://phonelib//lib/phonelib/core.rb#269
Phonelib::Core::NATIONAL_PREFIX_FOR_PARSING = T.let(T.unsafe(nil), Symbol)

# @private National prefix rule key
#
# source://phonelib//lib/phonelib/core.rb#273
Phonelib::Core::NATIONAL_PREFIX_RULE = T.let(T.unsafe(nil), Symbol)

# @private National prefix transform rule key
#
# source://phonelib//lib/phonelib/core.rb#271
Phonelib::Core::NATIONAL_PREFIX_TRANSFORM_RULE = T.let(T.unsafe(nil), Symbol)

# @private no international dialling type
#
# source://phonelib//lib/phonelib/core.rb#249
Phonelib::Core::NO_INTERNATIONAL_DIALING = T.let(T.unsafe(nil), Symbol)

# @private Pager phone number pattern key
#
# source://phonelib//lib/phonelib/core.rb#224
Phonelib::Core::PAGER = T.let(T.unsafe(nil), Symbol)

# @private Pattern key
#
# source://phonelib//lib/phonelib/core.rb#289
Phonelib::Core::PATTERN = T.let(T.unsafe(nil), Symbol)

# and may be routed to either a MOBILE or FIXED_LINE number.
#
# @private A personal number is associated with a particular person,
#
# source://phonelib//lib/phonelib/core.rb#222
Phonelib::Core::PERSONAL_NUMBER = T.let(T.unsafe(nil), Symbol)

# @private Plus sign
#
# source://phonelib//lib/phonelib/core.rb#294
Phonelib::Core::PLUS_SIGN = T.let(T.unsafe(nil), String)

# @private Possible regex pattern key
#
# source://phonelib//lib/phonelib/core.rb#265
Phonelib::Core::POSSIBLE_PATTERN = T.let(T.unsafe(nil), Symbol)

# @private Freephone line pattern key
#
# source://phonelib//lib/phonelib/core.rb#211
Phonelib::Core::PREMIUM_RATE = T.let(T.unsafe(nil), Symbol)

# between caller and recipient, and is hence typically less than
# PREMIUM_RATE calls
#
# @private Shared cost pattern key. The cost of this call is shared
#
# source://phonelib//lib/phonelib/core.rb#217
Phonelib::Core::SHARED_COST = T.let(T.unsafe(nil), Symbol)

# @private Short key
#
# source://phonelib//lib/phonelib/core.rb#291
Phonelib::Core::SHORT = T.let(T.unsafe(nil), Symbol)

# @private Short code
#
# source://phonelib//lib/phonelib/core.rb#239
Phonelib::Core::SHORT_CODE = T.let(T.unsafe(nil), Symbol)

# @private short codes types keys
#
# source://phonelib//lib/phonelib/core.rb#345
Phonelib::Core::SHORT_CODES = T.let(T.unsafe(nil), Array)

# @private SMS Services only type
#
# source://phonelib//lib/phonelib/core.rb#245
Phonelib::Core::SMS_SERVICES = T.let(T.unsafe(nil), Symbol)

# @private standard rate type
#
# source://phonelib//lib/phonelib/core.rb#255
Phonelib::Core::STANDARD_RATE = T.let(T.unsafe(nil), Symbol)

# @private Freephone line pattern key
#
# source://phonelib//lib/phonelib/core.rb#213
Phonelib::Core::TOLL_FREE = T.let(T.unsafe(nil), Symbol)

# @private Types key
#
# source://phonelib//lib/phonelib/core.rb#285
Phonelib::Core::TYPES = T.let(T.unsafe(nil), Symbol)

# @private hash of all phone types with human representation
#
# source://phonelib//lib/phonelib/core.rb#318
Phonelib::Core::TYPES_DESC = T.let(T.unsafe(nil), Hash)

# @private Used for 'Universal Access Numbers' or 'Company Numbers'.
#   They may be further routed to specific offices, but allow one number
#   to be used for a company.
#
# source://phonelib//lib/phonelib/core.rb#228
Phonelib::Core::UAN = T.let(T.unsafe(nil), Symbol)

# Internal use keys for validations
#
# @private Valid regex pattern key
#
# source://phonelib//lib/phonelib/core.rb#263
Phonelib::Core::VALID_PATTERN = T.let(T.unsafe(nil), Symbol)

# @private vanity numbers 4 keys letters
#
# source://phonelib//lib/phonelib/core.rb#297
Phonelib::Core::VANITY_4_LETTERS_KEYS_REGEX = T.let(T.unsafe(nil), Regexp)

# @private Used for 'Voice Mail Access Numbers'.
#
# source://phonelib//lib/phonelib/core.rb#230
Phonelib::Core::VOICEMAIL = T.let(T.unsafe(nil), Symbol)

# @private VoIP pattern key. This includes TSoIP (Telephony Service over IP)
#
# source://phonelib//lib/phonelib/core.rb#219
Phonelib::Core::VOIP = T.let(T.unsafe(nil), Symbol)

# class for parsed phone number, includes validation and formatting methods
#
# source://phonelib//lib/phonelib/phone.rb#3
class Phonelib::Phone
  include ::Phonelib::PhoneAnalyzerHelper
  include ::Phonelib::PhoneAnalyzer
  include ::Phonelib::PhoneExtendedData
  include ::Phonelib::PhoneFormatter

  # class initialization method
  #
  # @param phone [String] Phone number for parsing
  # @param country [String|Symbol] Country specification for parsing.
  #   Must be ISO code of country (2 letters) like 'US', 'us' or :us
  #   for United States
  # @return [Phonelib::Phone] parsed phone instance
  #
  # source://phonelib//lib/phonelib/phone.rb#25
  def initialize(phone, country = T.unsafe(nil)); end

  # Compare a phone number against a string or other parsed number
  #
  # @param other [String|Phonelib::Phone] Phone number to compare against
  # @return [Boolean] result of equality comparison
  #
  # source://phonelib//lib/phonelib/phone.rb#46
  def ==(other); end

  # Returns all countries that matched valid patterns
  #
  # @return [Array] Possible ISO2 country codes array
  #
  # source://phonelib//lib/phonelib/phone.rb#93
  def countries; end

  # Returns first country that matched valid patterns
  #
  # @return [String] valid country ISO2 code or first matched country code
  #
  # source://phonelib//lib/phonelib/phone.rb#113
  def country; end

  # @return [String] phone extension passed for parsing after a number
  #
  # source://phonelib//lib/phonelib/phone.rb#9
  def extension; end

  # Return human representation of phone type
  #
  # @return [String] Human readable valid phone type
  #
  # source://phonelib//lib/phonelib/phone.rb#87
  def human_type; end

  # Returns human representation of all matched phone types
  #
  # @return [Array] Array of human readable valid phone types
  #
  # source://phonelib//lib/phonelib/phone.rb#81
  def human_types; end

  # Returns whether a current parsed phone number is impossible
  #
  # @return [Boolean] parsed phone is impossible
  #
  # source://phonelib//lib/phonelib/phone.rb#137
  def impossible?; end

  # Returns whether a current parsed phone number is invalid
  #
  # @return [Boolean] parsed phone is invalid
  #
  # source://phonelib//lib/phonelib/phone.rb#125
  def invalid?; end

  # Returns whether a current parsed phone number is invalid for specified
  # country
  #
  # @param country [String|Symbol] ISO code of country (2 letters) like 'US',
  #   'us' or :us for United States
  # @return [Boolean] parsed phone number is invalid
  #
  # source://phonelib//lib/phonelib/phone.rb#173
  def invalid_for_country?(country); end

  # returns local number
  #
  # @return [String] local number
  #
  # source://phonelib//lib/phonelib/phone.rb#143
  def local_number; end

  # @return [String] phone national number
  #
  # source://phonelib//lib/phonelib/phone.rb#12
  def national_number; end

  # @return [String] original phone number passed for parsing
  #
  # source://phonelib//lib/phonelib/phone.rb#6
  def original; end

  # Returns whether a current parsed phone number is possible
  #
  # @return [Boolean] parsed phone is possible
  #
  # source://phonelib//lib/phonelib/phone.rb#131
  def possible?; end

  # Returns all possible types that matched possible patterns
  #
  # @return [Array] all possible phone types
  #
  # source://phonelib//lib/phonelib/phone.rb#69
  def possible_types; end

  # method to get sanitized phone number (only numbers)
  #
  # @return [String] Sanitized phone number
  #
  # source://phonelib//lib/phonelib/phone.rb#54
  def sanitized; end

  # method returns string representation of parsed phone
  #
  # source://phonelib//lib/phonelib/phone.rb#39
  def to_s; end

  # Returns first phone type that matched
  #
  # @return [Symbol] valid phone type
  #
  # source://phonelib//lib/phonelib/phone.rb#75
  def type; end

  # Returns all phone types that matched valid patterns
  #
  # @return [Array] all valid phone types
  #
  # source://phonelib//lib/phonelib/phone.rb#63
  def types; end

  # Returns whether a current parsed phone number is valid
  #
  # @return [Boolean] parsed phone is valid
  #
  # source://phonelib//lib/phonelib/phone.rb#119
  def valid?; end

  # Return countries with valid patterns
  #
  # @return [Array] Valid ISO2 country codes array
  #
  # source://phonelib//lib/phonelib/phone.rb#99
  def valid_countries; end

  # Return valid country
  #
  # @return [String] valid ISO2 country code
  #
  # source://phonelib//lib/phonelib/phone.rb#107
  def valid_country; end

  # Returns whether a current parsed phone number is valid for specified
  # country
  #
  # @param country [String|Symbol] ISO code of country (2 letters) like 'US',
  #   'us' or :us for United States
  # @return [Boolean] parsed phone number is valid
  #
  # source://phonelib//lib/phonelib/phone.rb#160
  def valid_for_country?(country); end

  private

  # @private get main country for code among provided countries
  #
  # source://phonelib//lib/phonelib/phone.rb#191
  def main_country(countries_array); end

  # @private extracts extension from passed phone number if provided
  #
  # source://phonelib//lib/phonelib/phone.rb#180
  def separate_extension(original); end
end

# @private phone analyzing methods module
#
# source://phonelib//lib/phonelib/phone_analyzer.rb#3
module Phonelib::PhoneAnalyzer
  include ::Phonelib::PhoneAnalyzerHelper

  # parses provided phone if it is valid for  country data and
  # returns result of analyze
  #
  # ==== Attributes
  #
  # * +phone+ - Phone number for parsing
  # * +passed_country+ - Country provided for parsing. Must be ISO code of
  #   country (2 letters) like 'US', 'us' or :us for United States
  #
  # source://phonelib//lib/phonelib/phone_analyzer.rb#18
  def analyze(phone, passed_country); end

  private

  # Returns all valid and possible phone number types for currently parsed
  # phone for provided data hash.
  #
  # ==== Attributes
  #
  # * +phone+ - phone number for parsing
  # * +data+  - country data
  # * +not_valid+ - specifies that number is not valid by general desc pattern
  #
  # source://phonelib//lib/phonelib/phone_analyzer.rb#163
  def all_number_types(phone, data, not_valid = T.unsafe(nil)); end

  # method checks which result is better to return
  #
  # source://phonelib//lib/phonelib/phone_analyzer.rb#38
  def better_result(base_result, result = T.unsafe(nil)); end

  # Create phone representation in e164 format
  #
  # ==== Attributes
  #
  # * +phone+ - phone number for parsing
  # * +data+  - country data to be based on for creating e164 representation
  #
  # source://phonelib//lib/phonelib/phone_analyzer.rb#123
  def convert_to_e164(phone, data); end

  # method tries to detect what is the country for provided phone
  #
  # ==== Attributes
  #
  # * +phone+ - phone number for parsing
  #
  # source://phonelib//lib/phonelib/phone_analyzer.rb#105
  def detect_and_parse(phone, country); end

  # Returns possible and valid patterns for validation for provided type
  #
  # ==== Attributes
  #
  # * +all_patterns+ - hash of all patterns for validation
  # * +type+ - type of phone to get patterns for
  #
  # source://phonelib//lib/phonelib/phone_analyzer.rb#198
  def get_patterns(all_patterns, type); end

  # returns national number and analyzing results for provided phone number
  #
  # ==== Attributes
  #
  # * +data+ - country data
  # * +country_match+ - result of match of phone within full regex
  # * +not_valid+ - specifies that number is not valid by general desc pattern
  #
  # source://phonelib//lib/phonelib/phone_analyzer.rb#144
  def national_and_data(data, country_match, not_valid = T.unsafe(nil)); end

  # Gets matched number formatting rule or default one
  #
  # ==== Attributes
  #
  # * +national+ - national phone number
  # * +format_data+  - formatting data from country data
  #
  # source://phonelib//lib/phonelib/phone_analyzer.rb#184
  def number_format(national, format_data); end

  # trying to parse phone for single country including international prefix
  # check for provided country
  #
  # ==== Attributes
  #
  # * +phone+ - phone for parsing
  # * +country+ - country to parse phone with
  #
  # source://phonelib//lib/phonelib/phone_analyzer.rb#68
  def parse_country(phone, country); end

  # method checks if phone is valid against single provided country data
  #
  # ==== Attributes
  #
  # * +e164+ - e164 representation of phone for parsing
  # * +data+ - country data for single country for parsing
  #
  # source://phonelib//lib/phonelib/phone_analyzer.rb#90
  def parse_single_country(e164, data); end

  # replacing national prefix to simplified format
  #
  # source://phonelib//lib/phonelib/phone_analyzer.rb#50
  def with_replaced_national_prefix(phone, data); end
end

# array of types not included for validation check in cycle
#
# source://phonelib//lib/phonelib/phone_analyzer.rb#8
Phonelib::PhoneAnalyzer::NOT_FOR_CHECK = T.let(T.unsafe(nil), Array)

# @private helper methods for analyser
#
# source://phonelib//lib/phonelib/phone_analyzer_helper.rb#3
module Phonelib::PhoneAnalyzerHelper
  private

  # changes phone to with/without double country prefix
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#55
  def changed_dp_phone(country, phone); end

  # defines whether country can have double country prefix in number
  #
  # @return [Boolean]
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#48
  def country_can_dp?(country); end

  # Get country that was provided or default country in needable format
  #
  # ==== Attributes
  #
  # * +country+ - country passed for parsing
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#91
  def country_or_default_country(country); end

  # returns country prefix for provided country or nil
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#36
  def country_prefix(country); end

  # caches regular expression, reusing it for later lookups
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#43
  def cr(regexp); end

  # checks if country can have numbers with double country prefixes
  #
  # ==== Attributes
  #
  # * +data+ - country data used for parsing
  # * +phone+ - phone number being parsed
  # * +parsed+ - parsed regex match for phone
  #
  # @return [Boolean]
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#74
  def double_prefix_allowed?(data, phone, parsed = T.unsafe(nil)); end

  # Checks if fixed line pattern and mobile pattern are the same and returns
  # appropriate keys
  #
  # ==== Attributes
  #
  # * +data+  - country data
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#172
  def fixed_and_mobile_keys(data); end

  # constructs full regex for phone validation for provided phone data
  # (international prefix, country code, national prefix, valid number)
  #
  # ==== Attributes
  #
  # * +data+ - country data hash
  # * +country_optional+ - whether to put country code as optional group
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#103
  def full_regex_for_data(data, type, country_optional = T.unsafe(nil)); end

  # Checks number against regex and compares match length
  #
  # ==== Attributes
  #
  # * +number+ - phone number for validation
  # * +regex+ - regex for perfoming a validation
  #
  # @return [Boolean]
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#203
  def number_match?(number, regex); end

  # Checks if passed number matches valid and possible patterns
  #
  # ==== Attributes
  #
  # * +number+ - phone number for validation
  # * +p_regex+ - possible regex pattern for validation
  # * +v_regex+ - valid regex pattern for validation
  # * +not_valid+ - specifies that number is not valid by general desc pattern
  #
  # @return [Boolean]
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#188
  def number_valid_and_possible?(number, p_regex, v_regex, not_valid = T.unsafe(nil)); end

  # Returns original number passed if it's a string or empty string otherwise
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#82
  def original_s; end

  # @return [Boolean]
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#6
  def original_starts_with_plus?; end

  # defines if to validate against single country or not
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#25
  def passed_country(country); end

  # Check if phone match country data
  #
  # ==== Attributes
  #
  # * +phone+ - phone number for parsing
  # * +data+  - country data
  #
  # @return [Boolean]
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#134
  def phone_match_data?(phone, data, possible = T.unsafe(nil)); end

  # checks if types has both :mobile and :fixed_line and replaces it with
  # :fixed_or_mobile in case both present
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#145
  def sanitize_fixed_mobile(types); end

  # Returns regex for type with special types if needed
  #
  # ==== Attributes
  #
  # * +data+ - country types data for single type
  # * +type+ - possible or valid regex type needed
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#120
  def type_regex(data, type); end

  # returns array of phone types for check for current country data
  #
  # ==== Attributes
  #
  # * +data+  - country data hash
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#160
  def types_for_check(data); end

  # converts symbols in phone to numbers
  #
  # source://phonelib//lib/phonelib/phone_analyzer_helper.rb#11
  def vanity_converted(phone); end
end

# module provides extended data methods for parsed phone
#
# source://phonelib//lib/phonelib/phone_extended_data.rb#3
module Phonelib::PhoneExtendedData
  # Returns carrier of parsed phone number or nil if number is invalid or
  # there is no carrier specified in db for this number
  #
  # @return [String|nil] carrier for parsed phone
  #
  # source://phonelib//lib/phonelib/phone_extended_data.rb#30
  def carrier; end

  # Returns geo name of parsed phone number or nil if number is invalid or
  # there is no geo name specified in db for this number
  #
  # @return [String|nil] geo name for parsed phone
  #
  # source://phonelib//lib/phonelib/phone_extended_data.rb#14
  def geo_name; end

  # Returns timezone of parsed phone number or nil if number is invalid or
  # there is no timezone specified in db for this number
  #
  # @return [String|nil] timezone for parsed phone
  #
  # source://phonelib//lib/phonelib/phone_extended_data.rb#22
  def timezone; end

  # returns valid country name
  #
  # source://phonelib//lib/phonelib/phone_extended_data.rb#36
  def valid_country_name; end

  private

  # @private default extended data
  #
  # source://phonelib//lib/phonelib/phone_extended_data.rb#80
  def default_ext_data; end

  # @private returns extended data ids for current number
  #
  # source://phonelib//lib/phonelib/phone_extended_data.rb#60
  def ext_data; end

  # ==== Attributes
  #
  # * +name_key+ - names array key from extended data hash
  # * +id_key+   - parameter id key in resolved extended data for number
  #
  # @private get name from extended phone data by keys
  #
  # source://phonelib//lib/phonelib/phone_extended_data.rb#51
  def get_ext_name(names_key, id_key); end
end

# @private keys for extended data
#
# source://phonelib//lib/phonelib/phone_extended_data.rb#5
Phonelib::PhoneExtendedData::EXT_KEYS = T.let(T.unsafe(nil), Array)

# module includes all formatting methods
#
# source://phonelib//lib/phonelib/phone_formatter.rb#3
module Phonelib::PhoneFormatter
  # returns area code of parsed number
  #
  # @return [String|nil] parsed phone area code if available
  #
  # source://phonelib//lib/phonelib/phone_formatter.rb#89
  def area_code; end

  # Returns the country code from the original phone number.
  #
  # @return [String] matched country phone code
  #
  # source://phonelib//lib/phonelib/phone_formatter.rb#34
  def country_code; end

  # Returns e164 unformatted phone number
  #
  # @param prefix [String] prefix to be placed before the number, "+" by default
  # @return [String] phone formatted in E164 format
  #
  # source://phonelib//lib/phonelib/phone_formatter.rb#82
  def e164(prefix = T.unsafe(nil)); end

  # returns e164 format of phone with extension added
  #
  # @param prefix [String] prefix to be placed before the number, "+" by default
  # @return [String] phone formatted in E164 format with extension
  #
  # source://phonelib//lib/phonelib/phone_formatter.rb#75
  def full_e164(prefix = T.unsafe(nil)); end

  # returns international formatted number with extension added
  #
  # @param prefix [String] prefix to be placed before the number, "+" by default
  # @return [String] formatted internation phone number with extension
  #
  # source://phonelib//lib/phonelib/phone_formatter.rb#68
  def full_international(prefix = T.unsafe(nil)); end

  # returns national formatted number with extension added
  #
  # @return [String] formatted national number with extension
  #
  # source://phonelib//lib/phonelib/phone_formatter.rb#61
  def full_national; end

  # Returns e164 formatted phone number. Method can receive single string parameter that will be defined as prefix
  #
  # @param formatted [Boolean] whether to return numbers only or formatted
  # @param prefix [String] prefix to be placed before the number, "+" by default
  # @return [String] formatted international number
  #
  # source://phonelib//lib/phonelib/phone_formatter.rb#43
  def international(formatted = T.unsafe(nil), prefix = T.unsafe(nil)); end

  # source://phonelib//lib/phonelib/phone_formatter.rb#101
  def method_missing(method, *args); end

  # Returns formatted national number
  #
  # @param formatted [Boolean] whether to return numbers only or formatted
  # @return [String] formatted national number
  #
  # source://phonelib//lib/phonelib/phone_formatter.rb#7
  def national(formatted = T.unsafe(nil)); end

  # Returns the raw national number that was defined during parsing
  #
  # @return [String] raw national number
  #
  # source://phonelib//lib/phonelib/phone_formatter.rb#21
  def raw_national; end

  private

  # @private defines if phone can have area code
  # @return [Boolean]
  #
  # source://phonelib//lib/phonelib/phone_formatter.rb#113
  def area_code_possible?; end

  # @private defines whether to put country prefix or not
  #
  # source://phonelib//lib/phonelib/phone_formatter.rb#126
  def country_prefix_or_not; end

  # @private returns extension with separator defined
  #
  # source://phonelib//lib/phonelib/phone_formatter.rb#132
  def formatted_extension; end

  # @private Get needable data for formatting phone as national number
  #
  # source://phonelib//lib/phonelib/phone_formatter.rb#139
  def formatting_data; end
end
