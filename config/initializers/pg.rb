# typed: strict
# frozen_string_literal: true

# Fix crash during Tapioca DSL generation.
#
# See: https://github.com/Shopify/tapioca/issues/1555#issuecomment-1640258455
ENV["PGGSSENCMODE"] = "disable" if Rails.env.development?
