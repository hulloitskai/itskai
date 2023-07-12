# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for dynamic methods in `GoodJob::ProcessesController`.
# Please instead update this file by running `bin/tapioca dsl GoodJob::ProcessesController`.

class GoodJob::ProcessesController
  sig { returns(HelperProxy) }
  def helpers; end

  module HelperMethods
    include ::ActionText::ContentHelper
    include ::ActionText::TagHelper
    include ::InertiaRails::Helper
    include ::ViteRails::TagHelpers
    include ::ActionController::Base::HelperMethods
    include ::GoodJob::ApplicationHelper
  end

  class HelperProxy < ::ActionView::Base
    include HelperMethods
  end
end
