# typed: strict
# frozen_string_literal: true

Filelike = T.type_alias { T.any(File, Tempfile) }
