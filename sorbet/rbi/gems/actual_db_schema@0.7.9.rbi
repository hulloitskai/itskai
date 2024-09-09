# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `actual_db_schema` gem.
# Please instead update this file by running `bin/tapioca gem actual_db_schema`.


class ActiveRecord::MigrationProxy < ::Struct
  include ::ActualDbSchema::Patches::MigrationProxy
end

# The main module definition
#
# source://actual_db_schema//lib/actual_db_schema/engine.rb#3
module ActualDbSchema
  class << self
    # Returns the value of attribute config.
    #
    # source://actual_db_schema//lib/actual_db_schema.rb#25
    def config; end

    # Sets the attribute config
    #
    # @param value the value to set the attribute config to.
    #
    # source://actual_db_schema//lib/actual_db_schema.rb#25
    def config=(_arg0); end

    # source://actual_db_schema//lib/actual_db_schema.rb#64
    def db_config; end

    # source://actual_db_schema//lib/actual_db_schema.rb#52
    def default_migrated_folder; end

    # Returns the value of attribute failed.
    #
    # source://actual_db_schema//lib/actual_db_schema.rb#25
    def failed; end

    # Sets the attribute failed
    #
    # @param value the value to set the attribute failed to.
    #
    # source://actual_db_schema//lib/actual_db_schema.rb#25
    def failed=(_arg0); end

    # source://actual_db_schema//lib/actual_db_schema.rb#35
    def migrated_folder; end

    # source://actual_db_schema//lib/actual_db_schema.rb#39
    def migrated_folders; end

    # source://actual_db_schema//lib/actual_db_schema.rb#72
    def migration_filename(fullpath); end

    # source://actual_db_schema//lib/actual_db_schema.rb#56
    def migrations_paths; end

    # source://railties/7.1.3.4/lib/rails/engine.rb#412
    def railtie_helpers_paths; end

    # source://railties/7.1.3.4/lib/rails/engine.rb#395
    def railtie_namespace; end

    # source://railties/7.1.3.4/lib/rails/engine.rb#416
    def railtie_routes_url_helpers(include_path_helpers = T.unsafe(nil)); end

    # source://railties/7.1.3.4/lib/rails/engine.rb#401
    def table_name_prefix; end

    # source://railties/7.1.3.4/lib/rails/engine.rb#408
    def use_relative_model_naming?; end
  end
end

# source://actual_db_schema//lib/actual_db_schema/commands/base.rb#4
module ActualDbSchema::Commands; end

# Base class for all commands
#
# source://actual_db_schema//lib/actual_db_schema/commands/base.rb#6
class ActualDbSchema::Commands::Base
  # @return [Base] a new instance of Base
  #
  # source://actual_db_schema//lib/actual_db_schema/commands/base.rb#9
  def initialize(context); end

  # source://actual_db_schema//lib/actual_db_schema/commands/base.rb#13
  def call; end

  # Returns the value of attribute context.
  #
  # source://actual_db_schema//lib/actual_db_schema/commands/base.rb#7
  def context; end

  private

  # @raise [NotImplementedError]
  #
  # source://actual_db_schema//lib/actual_db_schema/commands/base.rb#23
  def call_impl; end
end

# Shows the list of phantom migrations
#
# source://actual_db_schema//lib/actual_db_schema/commands/list.rb#6
class ActualDbSchema::Commands::List < ::ActualDbSchema::Commands::Base
  private

  # source://actual_db_schema//lib/actual_db_schema/commands/list.rb#73
  def branch_column_width; end

  # source://actual_db_schema//lib/actual_db_schema/commands/list.rb#64
  def branch_for(version); end

  # source://actual_db_schema//lib/actual_db_schema/commands/list.rb#9
  def call_impl; end

  # source://actual_db_schema//lib/actual_db_schema/commands/list.rb#31
  def header; end

  # source://actual_db_schema//lib/actual_db_schema/commands/list.rb#14
  def indexed_phantom_migrations; end

  # source://actual_db_schema//lib/actual_db_schema/commands/list.rb#48
  def line_for(status, version); end

  # source://actual_db_schema//lib/actual_db_schema/commands/list.rb#68
  def longest_branch_name; end

  # source://actual_db_schema//lib/actual_db_schema/commands/list.rb#60
  def metadata; end

  # source://actual_db_schema//lib/actual_db_schema/commands/list.rb#18
  def preambule; end

  # source://actual_db_schema//lib/actual_db_schema/commands/list.rb#27
  def separator_width; end

  # source://actual_db_schema//lib/actual_db_schema/commands/list.rb#41
  def table; end
end

# Rolls back all phantom migrations
#
# source://actual_db_schema//lib/actual_db_schema/commands/rollback.rb#6
class ActualDbSchema::Commands::Rollback < ::ActualDbSchema::Commands::Base
  # @return [Rollback] a new instance of Rollback
  #
  # source://actual_db_schema//lib/actual_db_schema/commands/rollback.rb#13
  def initialize(context, manual_mode: T.unsafe(nil)); end

  private

  # source://actual_db_schema//lib/actual_db_schema/commands/rollback.rb#20
  def call_impl; end

  # source://actual_db_schema//lib/actual_db_schema/commands/rollback.rb#61
  def colorize(text, color); end

  # source://actual_db_schema//lib/actual_db_schema/commands/rollback.rb#32
  def failed_migrations_list; end

  # @return [Boolean]
  #
  # source://actual_db_schema//lib/actual_db_schema/commands/rollback.rb#57
  def manual_mode_default?; end

  # source://actual_db_schema//lib/actual_db_schema/commands/rollback.rb#51
  def puts_into; end

  # source://actual_db_schema//lib/actual_db_schema/commands/rollback.rb#45
  def puts_preamble; end
end

# source://actual_db_schema//lib/actual_db_schema/commands/rollback.rb#7
ActualDbSchema::Commands::Rollback::UNICODE_COLORS = T.let(T.unsafe(nil), Hash)

# It isolates the namespace to avoid conflicts with the main application.
#
# source://actual_db_schema//lib/actual_db_schema/engine.rb#5
class ActualDbSchema::Engine < ::Rails::Engine
  class << self
    # source://activesupport/7.1.3.4/lib/active_support/callbacks.rb#70
    def __callbacks; end
  end
end

# source://actual_db_schema//lib/actual_db_schema/failed_migration.rb#4
class ActualDbSchema::FailedMigration < ::Struct
  # Returns the value of attribute exception
  #
  # @return [Object] the current value of exception
  def exception; end

  # Sets the attribute exception
  #
  # @param value [Object] the value to set the attribute exception to.
  # @return [Object] the newly set value
  def exception=(_); end

  # source://actual_db_schema//lib/actual_db_schema/failed_migration.rb#5
  def filename; end

  # Returns the value of attribute migration
  #
  # @return [Object] the current value of migration
  def migration; end

  # Sets the attribute migration
  #
  # @param value [Object] the value to set the attribute migration to.
  # @return [Object] the newly set value
  def migration=(_); end

  # source://actual_db_schema//lib/actual_db_schema/failed_migration.rb#9
  def short_filename; end

  class << self
    def [](*_arg0); end
    def inspect; end
    def keyword_init?; end
    def members; end
    def new(*_arg0); end
  end
end

# Git helper
#
# source://actual_db_schema//lib/actual_db_schema/git.rb#5
class ActualDbSchema::Git
  class << self
    # source://actual_db_schema//lib/actual_db_schema/git.rb#6
    def current_branch; end
  end
end

# The Migration class is responsible for managing and retrieving migration information
#
# source://actual_db_schema//lib/actual_db_schema/migration.rb#5
class ActualDbSchema::Migration
  include ::Singleton
  extend ::Singleton::SingletonClassMethods

  # source://actual_db_schema//lib/actual_db_schema/migration.rb#25
  def all; end

  # source://actual_db_schema//lib/actual_db_schema/migration.rb#10
  def all_phantom; end

  # source://actual_db_schema//lib/actual_db_schema/migration.rb#40
  def find(version, database); end

  # source://actual_db_schema//lib/actual_db_schema/migration.rb#65
  def migrate(version, database); end

  # source://actual_db_schema//lib/actual_db_schema/migration.rb#50
  def rollback(version, database); end

  # source://actual_db_schema//lib/actual_db_schema/migration.rb#61
  def rollback_all; end

  private

  # source://actual_db_schema//lib/actual_db_schema/migration.rb#110
  def branch_for(version); end

  # source://actual_db_schema//lib/actual_db_schema/migration.rb#78
  def build_migration_struct(status, migration); end

  # source://actual_db_schema//lib/actual_db_schema/migration.rb#102
  def find_migration_in_context(context, version); end

  # source://actual_db_schema//lib/actual_db_schema/migration.rb#114
  def metadata; end

  # @return [Boolean]
  #
  # source://actual_db_schema//lib/actual_db_schema/migration.rb#94
  def phantom?(migration); end

  # @return [Boolean]
  #
  # source://actual_db_schema//lib/actual_db_schema/migration.rb#98
  def should_include?(status, migration); end

  # source://actual_db_schema//lib/actual_db_schema/migration.rb#90
  def sort_migrations_desc(migrations); end

  class << self
    private

    def allocate; end
    def new(*_arg0); end
  end
end

# source://actual_db_schema//lib/actual_db_schema/migration.rb#8
class ActualDbSchema::Migration::Migration < ::Struct
  # Returns the value of attribute branch
  #
  # @return [Object] the current value of branch
  def branch; end

  # Sets the attribute branch
  #
  # @param value [Object] the value to set the attribute branch to.
  # @return [Object] the newly set value
  def branch=(_); end

  # Returns the value of attribute database
  #
  # @return [Object] the current value of database
  def database; end

  # Sets the attribute database
  #
  # @param value [Object] the value to set the attribute database to.
  # @return [Object] the newly set value
  def database=(_); end

  # Returns the value of attribute filename
  #
  # @return [Object] the current value of filename
  def filename; end

  # Sets the attribute filename
  #
  # @param value [Object] the value to set the attribute filename to.
  # @return [Object] the newly set value
  def filename=(_); end

  # Returns the value of attribute name
  #
  # @return [Object] the current value of name
  def name; end

  # Sets the attribute name
  #
  # @param value [Object] the value to set the attribute name to.
  # @return [Object] the newly set value
  def name=(_); end

  # Returns the value of attribute phantom
  #
  # @return [Object] the current value of phantom
  def phantom; end

  # Sets the attribute phantom
  #
  # @param value [Object] the value to set the attribute phantom to.
  # @return [Object] the newly set value
  def phantom=(_); end

  # Returns the value of attribute status
  #
  # @return [Object] the current value of status
  def status; end

  # Sets the attribute status
  #
  # @param value [Object] the value to set the attribute status to.
  # @return [Object] the newly set value
  def status=(_); end

  # Returns the value of attribute version
  #
  # @return [Object] the current value of version
  def version; end

  # Sets the attribute version
  #
  # @param value [Object] the value to set the attribute version to.
  # @return [Object] the newly set value
  def version=(_); end

  class << self
    def [](*_arg0); end
    def inspect; end
    def keyword_init?; end
    def members; end
    def new(*_arg0); end
  end
end

# The class manages connections to each database and provides the appropriate migration context for each connection.
#
# source://actual_db_schema//lib/actual_db_schema/migration_context.rb#5
class ActualDbSchema::MigrationContext
  include ::Singleton
  extend ::Singleton::SingletonClassMethods

  # source://actual_db_schema//lib/actual_db_schema/migration_context.rb#8
  def each; end

  private

  # source://actual_db_schema//lib/actual_db_schema/migration_context.rb#22
  def configs; end

  # source://actual_db_schema//lib/actual_db_schema/migration_context.rb#31
  def context; end

  # source://actual_db_schema//lib/actual_db_schema/migration_context.rb#17
  def establish_connection(db_config); end

  class << self
    private

    def allocate; end
    def new(*_arg0); end
  end
end

class ActualDbSchema::MigrationsController < ::ActionController::Base
  def index; end
  def migrate; end
  def rollback; end
  def show; end

  private

  # source://actionview/7.1.3.4/lib/action_view/layouts.rb#330
  def _layout(lookup_context, formats); end

  def handle_migrate(id, database); end
  def handle_rollback(id, database); end
  def migration; end
  def migrations; end

  class << self
    # source://activesupport/7.1.3.4/lib/active_support/callbacks.rb#70
    def __callbacks; end

    # source://actionpack/7.1.3.4/lib/abstract_controller/helpers.rb#12
    def _helper_methods; end

    # source://actionpack/7.1.3.4/lib/action_dispatch/routing/route_set.rb#584
    def _routes; end

    # source://actionpack/7.1.3.4/lib/action_controller/metal/params_wrapper.rb#187
    def _wrapper_options; end

    # source://actionpack/7.1.3.4/lib/action_controller/metal/helpers.rb#65
    def helpers_path; end

    # source://actionpack/7.1.3.4/lib/action_controller/metal.rb#262
    def middleware_stack; end
  end
end

module ActualDbSchema::MigrationsController::HelperMethods
  include ::ActionText::ContentHelper
  include ::ActionText::TagHelper
  include ::InertiaRails::AssetHelper
  include ::ViteRails::TagHelpers
  include ::ActionController::Base::HelperMethods

  # def migration(*args, **_arg1, &block); end
  # def migrations(*args, **_arg1, &block); end
end

# source://actual_db_schema//lib/actual_db_schema/patches/migration_proxy.rb#4
module ActualDbSchema::Patches; end

# Add new command to roll back the phantom migrations
#
# source://actual_db_schema//lib/actual_db_schema/patches/migration_context.rb#6
module ActualDbSchema::Patches::MigrationContext
  # source://actual_db_schema//lib/actual_db_schema/patches/migration_context.rb#18
  def phantom_migrations; end

  # source://actual_db_schema//lib/actual_db_schema/patches/migration_context.rb#7
  def rollback_branches(manual_mode: T.unsafe(nil)); end

  private

  # source://actual_db_schema//lib/actual_db_schema/patches/migration_context.rb#80
  def branch_for(version); end

  # source://actual_db_schema//lib/actual_db_schema/patches/migration_context.rb#30
  def down_migrator_for(migration); end

  # source://actual_db_schema//lib/actual_db_schema/patches/migration_context.rb#84
  def metadata; end

  # source://actual_db_schema//lib/actual_db_schema/patches/migration_context.rb#74
  def migrate(migration); end

  # source://actual_db_schema//lib/actual_db_schema/patches/migration_context.rb#40
  def migration_files; end

  # source://actual_db_schema//lib/actual_db_schema/patches/migration_context.rb#65
  def show_info_for(migration); end

  # @return [Boolean]
  #
  # source://actual_db_schema//lib/actual_db_schema/patches/migration_context.rb#53
  def status_up?(migration); end

  # @return [Boolean]
  #
  # source://actual_db_schema//lib/actual_db_schema/patches/migration_context.rb#59
  def user_wants_rollback?; end
end

# Records the migration file into the tmp folder after it's been migrated
#
# source://actual_db_schema//lib/actual_db_schema/patches/migration_proxy.rb#6
module ActualDbSchema::Patches::MigrationProxy
  # source://actual_db_schema//lib/actual_db_schema/patches/migration_proxy.rb#7
  def migrate(direction); end
end

# Run only one migration that's being rolled back
#
# source://actual_db_schema//lib/actual_db_schema/patches/migrator.rb#6
module ActualDbSchema::Patches::Migrator
  # source://actual_db_schema//lib/actual_db_schema/patches/migrator.rb#7
  def runnable; end
end

class ActualDbSchema::PhantomMigrationsController < ::ActionController::Base
  def index; end
  def rollback; end
  def rollback_all; end
  def show; end

  private

  # source://actionview/7.1.3.4/lib/action_view/layouts.rb#330
  def _layout(lookup_context, formats); end

  def handle_rollback(id, database); end
  def handle_rollback_all; end
  def phantom_migration; end
  def phantom_migrations; end

  class << self
    # source://activesupport/7.1.3.4/lib/active_support/callbacks.rb#70
    def __callbacks; end

    # source://actionpack/7.1.3.4/lib/abstract_controller/helpers.rb#12
    def _helper_methods; end

    # source://actionpack/7.1.3.4/lib/action_dispatch/routing/route_set.rb#584
    def _routes; end

    # source://actionpack/7.1.3.4/lib/action_controller/metal/params_wrapper.rb#187
    def _wrapper_options; end

    # source://actionpack/7.1.3.4/lib/action_controller/metal/helpers.rb#65
    def helpers_path; end

    # source://actionpack/7.1.3.4/lib/action_controller/metal.rb#262
    def middleware_stack; end
  end
end

module ActualDbSchema::PhantomMigrationsController::HelperMethods
  include ::ActionText::ContentHelper
  include ::ActionText::TagHelper
  include ::InertiaRails::AssetHelper
  include ::ViteRails::TagHelpers
  include ::ActionController::Base::HelperMethods

  # def phantom_migration(*args, **_arg1, &block); end
  # def phantom_migrations(*args, **_arg1, &block); end
end

# Stores the migrated files into the tmp folder
#
# source://actual_db_schema//lib/actual_db_schema/store.rb#5
class ActualDbSchema::Store
  include ::Singleton
  extend ::Singleton::SingletonClassMethods

  # source://actual_db_schema//lib/actual_db_schema/store.rb#17
  def read; end

  # source://actual_db_schema//lib/actual_db_schema/store.rb#10
  def write(filename); end

  private

  # source://actual_db_schema//lib/actual_db_schema/store.rb#36
  def folder; end

  # source://actual_db_schema//lib/actual_db_schema/store.rb#25
  def record_metadata(filename); end

  # source://actual_db_schema//lib/actual_db_schema/store.rb#40
  def store_file; end

  class << self
    private

    def allocate; end
    def new(*_arg0); end
  end
end

# source://actual_db_schema//lib/actual_db_schema/store.rb#8
class ActualDbSchema::Store::Item < ::Struct
  # Returns the value of attribute branch
  #
  # @return [Object] the current value of branch
  def branch; end

  # Sets the attribute branch
  #
  # @param value [Object] the value to set the attribute branch to.
  # @return [Object] the newly set value
  def branch=(_); end

  # Returns the value of attribute timestamp
  #
  # @return [Object] the current value of timestamp
  def timestamp; end

  # Sets the attribute timestamp
  #
  # @param value [Object] the value to set the attribute timestamp to.
  # @return [Object] the newly set value
  def timestamp=(_); end

  # Returns the value of attribute version
  #
  # @return [Object] the current value of version
  def version; end

  # Sets the attribute version
  #
  # @param value [Object] the value to set the attribute version to.
  # @return [Object] the newly set value
  def version=(_); end

  class << self
    def [](*_arg0); end
    def inspect; end
    def keyword_init?; end
    def members; end
    def new(*_arg0); end
  end
end

# source://actual_db_schema//lib/actual_db_schema/version.rb#4
ActualDbSchema::VERSION = T.let(T.unsafe(nil), String)
