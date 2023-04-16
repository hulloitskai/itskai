# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for dynamic methods in `GoodJob::BatchesController`.
# Please instead update this file by running `bin/tapioca dsl GoodJob::BatchesController`.

class GoodJob::BatchesController
  sig { returns(HelperProxy) }
  def helpers; end

  module HelperMethods
    include ::ActionText::ContentHelper
    include ::ActionText::TagHelper
    include ::InertiaRails::Helper
    include ::ViteRails::TagHelpers
    include ::ActionController::Base::HelperMethods
    include ::GoodJob::ApplicationHelper

    sig { returns(T.untyped) }
    def good_job_available_locales; end
  end

  class HelperProxy < ::ActionView::Base
    include HelperMethods
  end
end