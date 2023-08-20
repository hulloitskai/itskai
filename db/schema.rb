# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_20_171018) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "active_storage_attachments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.uuid "record_id", null: false
    t.uuid "blob_id", null: false
    t.timestamp "created_at", precision: 6, null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.timestamp "created_at", precision: 6, null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "cookies", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "domain", null: false
    t.string "name", null: false
    t.string "value", null: false
    t.boolean "session", null: false
    t.boolean "host_only", null: false
    t.float "expiration_date"
    t.string "path", null: false
    t.boolean "http_only", null: false
    t.boolean "secure", null: false
    t.string "same_site", null: false
    t.datetime "created_at", null: false
    t.string "service", null: false
    t.index ["service"], name: "index_cookies_on_service"
  end

  create_table "good_job_batches", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.jsonb "serialized_properties"
    t.text "on_finish"
    t.text "on_success"
    t.text "on_discard"
    t.text "callback_queue_name"
    t.integer "callback_priority"
    t.datetime "enqueued_at"
    t.datetime "discarded_at"
    t.datetime "finished_at"
  end

  create_table "good_job_executions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "active_job_id", null: false
    t.text "job_class"
    t.text "queue_name"
    t.jsonb "serialized_params"
    t.datetime "scheduled_at"
    t.datetime "finished_at"
    t.text "error"
    t.integer "error_event", limit: 2
    t.index ["active_job_id", "created_at"], name: "index_good_job_executions_on_active_job_id_and_created_at"
  end

  create_table "good_job_processes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "state"
  end

  create_table "good_job_settings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "key"
    t.jsonb "value"
    t.index ["key"], name: "index_good_job_settings_on_key", unique: true
  end

  create_table "good_jobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "queue_name"
    t.integer "priority"
    t.jsonb "serialized_params"
    t.datetime "scheduled_at"
    t.datetime "performed_at"
    t.datetime "finished_at"
    t.text "error"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "active_job_id"
    t.text "concurrency_key"
    t.text "cron_key"
    t.uuid "retried_good_job_id"
    t.datetime "cron_at"
    t.uuid "batch_id"
    t.uuid "batch_callback_id"
    t.boolean "is_discrete"
    t.integer "executions_count"
    t.text "job_class"
    t.integer "error_event", limit: 2
    t.index ["active_job_id", "created_at"], name: "index_good_jobs_on_active_job_id_and_created_at"
    t.index ["active_job_id"], name: "index_good_jobs_on_active_job_id"
    t.index ["batch_callback_id"], name: "index_good_jobs_on_batch_callback_id", where: "(batch_callback_id IS NOT NULL)"
    t.index ["batch_id"], name: "index_good_jobs_on_batch_id", where: "(batch_id IS NOT NULL)"
    t.index ["concurrency_key"], name: "index_good_jobs_on_concurrency_key_when_unfinished", where: "(finished_at IS NULL)"
    t.index ["cron_key", "created_at"], name: "index_good_jobs_on_cron_key_and_created_at"
    t.index ["cron_key", "cron_at"], name: "index_good_jobs_on_cron_key_and_cron_at", unique: true
    t.index ["finished_at"], name: "index_good_jobs_jobs_on_finished_at", where: "((retried_good_job_id IS NULL) AND (finished_at IS NOT NULL))"
    t.index ["priority", "created_at"], name: "index_good_jobs_jobs_on_priority_created_at_when_unfinished", order: { priority: "DESC NULLS LAST" }, where: "(finished_at IS NULL)"
    t.index ["queue_name", "scheduled_at"], name: "index_good_jobs_on_queue_name_and_scheduled_at", where: "(finished_at IS NULL)"
    t.index ["scheduled_at"], name: "index_good_jobs_on_scheduled_at", where: "(finished_at IS NULL)"
  end

  create_table "icloud_credentials", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "password", null: false
    t.text "cookies"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "session"
    t.string "email", null: false
  end

  create_table "instagram_credentials", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "username", null: false
    t.string "password", null: false
    t.jsonb "session"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "journal_entries", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "started_at", precision: nil, null: false
    t.datetime "last_edited_at", precision: nil, null: false
    t.string "title", null: false
    t.string "notion_page_id", null: false
    t.jsonb "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "imported_at", precision: nil, null: false
    t.index ["notion_page_id"], name: "index_journal_entries_on_notion_page_id", unique: true
  end

  create_table "location_log_addresses", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "location_log_id", null: false
    t.string "full_address", null: false
    t.string "country", null: false
    t.string "country_code", null: false
    t.string "province", null: false
    t.string "city"
    t.string "neighbourhood"
    t.string "postal_code"
    t.datetime "created_at", precision: nil, null: false
    t.index ["location_log_id"], name: "index_location_log_addresses_on_location_log_id"
  end

  create_table "location_logs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.geography "coordinates", limit: {:srid=>4326, :type=>"st_point", :has_z=>true, :geographic=>true}, null: false
    t.integer "floor_level", null: false
    t.float "horizontal_accuracy", null: false
    t.float "vertical_accuracy", null: false
    t.datetime "timestamp", precision: nil, null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["timestamp"], name: "index_location_logs_on_timestamp"
  end

  create_table "oauth_credentials", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "provider", null: false
    t.string "uid", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "refresh_token", null: false
    t.index ["provider", "uid"], name: "index_oauth_credentials_on_provider_and_uid", unique: true
  end

  create_table "obsidian_notes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "aliases", default: [], null: false, array: true
    t.string "tags", default: [], null: false, array: true
    t.text "content", null: false
    t.datetime "modified_at", precision: nil, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "analyzed_at", precision: nil
    t.text "blurb"
    t.boolean "hidden", default: false, null: false
    t.boolean "published", default: false, null: false
    t.string "slug", null: false
    t.text "plain_blurb"
    t.string "title", null: false
    t.datetime "imported_at", precision: nil, null: false
    t.index ["aliases"], name: "index_obsidian_notes_on_aliases"
    t.index ["analyzed_at"], name: "index_obsidian_notes_on_analyzed_at"
    t.index ["imported_at"], name: "index_obsidian_notes_on_imported_at"
    t.index ["modified_at"], name: "index_obsidian_notes_on_modified_at"
    t.index ["name"], name: "index_obsidian_notes_on_name", unique: true
    t.index ["slug"], name: "index_obsidian_notes_on_slug", unique: true
    t.index ["tags"], name: "index_obsidian_notes_on_tags"
  end

  create_table "obsidian_relations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "from_id", null: false
    t.uuid "to_id", null: false
    t.string "to_type", default: "nil", null: false
    t.index ["from_id", "to_id"], name: "index_obsidian_relations_uniqueness", unique: true
    t.index ["from_id"], name: "index_obsidian_relations_on_from_id"
    t.index ["to_id"], name: "index_obsidian_relations_on_to_id"
  end

  create_table "obsidian_stubs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_obsidian_stubs_on_name", unique: true
  end

  create_table "pensieve_message_likes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "message_id", null: false
    t.string "session_id", null: false
    t.datetime "created_at", precision: nil, null: false
    t.index ["message_id", "session_id"], name: "index_pensieve_message_likes_uniqueness", unique: true
    t.index ["message_id"], name: "index_pensieve_message_likes_on_message_id"
  end

  create_table "pensieve_messages", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "text", null: false
    t.string "from", null: false
    t.bigint "telegram_message_id", null: false
    t.datetime "timestamp", precision: nil, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "edit_timestamp", precision: nil
    t.index ["telegram_message_id"], name: "index_pensieve_messages_on_telegram_message_id", unique: true
  end

  create_table "scottcalls", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "telnyx_call_control_id", null: false
    t.datetime "created_at", precision: nil, null: false
    t.string "signal", null: false
    t.index ["telnyx_call_control_id"], name: "index_scottcalls_on_telnyx_call_control_id", unique: true
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", null: false
    t.string "encrypted_password", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "location_log_addresses", "location_logs"
  add_foreign_key "obsidian_relations", "obsidian_notes", column: "from_id"
  add_foreign_key "pensieve_message_likes", "pensieve_messages", column: "message_id"
end
