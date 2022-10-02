# typed: false
# frozen_string_literal: true

class ReactOnRails::PacksGenerator
  def verify_setup_and_generate_packs
    return if components_subdirectory.blank?
    unless ReactOnRails::WebpackerUtils.using_webpacker?
      raise_webpacker_not_installed
    end
    unless shackapacker_version_requirement_met?
      raise_shakapacker_version_incompatible
    end
    unless ReactOnRails::WebpackerUtils.nested_entries?
      raise_nested_enteries_disabled
    end
    clean_generated_packs_directory
    generate_packs
  end
end
