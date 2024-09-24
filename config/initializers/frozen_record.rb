# typed: true
# frozen_string_literal: true

# Frozen Record is not meant to operate on large unindexed datasets.
#
# See: https://github.com/byroot/frozen_record?tab=readme-ov-file#limitations
FrozenRecord::Base.max_records_scan = 500
