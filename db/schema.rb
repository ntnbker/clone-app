# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170112043512) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "access_contacts", force: :cascade do |t|
    t.string   "relation"
    t.string   "name"
    t.string   "email"
    t.string   "mobile"
    t.integer  "maintenance_request_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "agencies", force: :cascade do |t|
    t.string   "company_name"
    t.string   "business_name"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "abn"
    t.string   "address"
    t.string   "mailing_address"
    t.string   "phone"
    t.string   "mobile_phone"
    t.string   "license_number"
    t.boolean  "bdm_verification_status"
    t.string   "bdm_verification_id"
    t.boolean  "mailing_same_address"
    t.string   "corporation_license_number"
    t.string   "license_type"
  end

  create_table "agency_admins", force: :cascade do |t|
    t.string  "company_name"
    t.string  "business_name"
    t.string  "email"
    t.string  "phone"
    t.string  "address"
    t.string  "first_name"
    t.string  "last_name"
    t.integer "user_id"
    t.string  "abn"
    t.string  "mailing_address"
    t.string  "mobile_phone"
    t.string  "license_number"
    t.string  "license_type"
    t.string  "corporation_license_number"
    t.boolean "bdm_verification_status"
    t.string  "bdm_verification_id"
    t.boolean "mailing_same_address"
    t.integer "agency_id"
  end

  create_table "agency_tradie_companies", force: :cascade do |t|
    t.integer  "agency_id"
    t.integer  "tradie_company_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "agency_tradies", force: :cascade do |t|
    t.integer  "agency_id"
    t.integer  "tradie_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "trady_id"
  end

  create_table "agents", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "availabilities", force: :cascade do |t|
    t.integer  "maintenance_request_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.boolean  "available_only_by_appointment"
    t.date     "date"
    t.time     "start_time"
    t.time     "finish_time"
  end

  create_table "conversations", force: :cascade do |t|
    t.integer  "sender_id"
    t.integer  "recipient_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "conversation_type"
    t.integer  "maintenance_request_id"
  end

  create_table "gods", force: :cascade do |t|
    t.string   "full_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  create_table "guests", force: :cascade do |t|
    t.integer "user_id"
  end

  create_table "landlords", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "mobile"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  create_table "main_users", force: :cascade do |t|
    t.string   "main_user_type"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "god_id"
  end

  create_table "maintenance_requests", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "mobile"
    t.text     "access_contact"
    t.string   "maintenance_heading"
    t.text     "maintenance_description"
    t.integer  "image"
    t.text     "availability"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "agent_id"
    t.integer  "tenant_id"
    t.integer  "tradie_id"
    t.string   "person_in_charge"
    t.string   "real_estate_office"
    t.string   "agent_name"
    t.string   "agent_email"
    t.string   "agent_mobile"
    t.string   "service_type"
    t.integer  "property_id"
    t.integer  "agency_id"
    t.integer  "agency_admin_id"
  end

  create_table "messages", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.text     "body"
    t.integer  "conversation_id"
  end

  create_table "properties", force: :cascade do |t|
    t.integer "agency_admin_id"
    t.integer "landlord_id"
    t.string  "property_address"
  end

  create_table "queries", force: :cascade do |t|
    t.integer "maintenance_request_id"
    t.string  "user_role"
    t.string  "tradie"
    t.string  "address"
  end

  create_table "quote_items", force: :cascade do |t|
    t.integer "quote_id"
    t.string  "item_description"
    t.integer "amount"
  end

  create_table "quotes", force: :cascade do |t|
    t.integer  "amount"
    t.integer  "maintenance_request_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "trady_id"
  end

  create_table "roles", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "roleable_type"
    t.integer  "roleable_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "service_needs", force: :cascade do |t|
  end

  create_table "services", force: :cascade do |t|
    t.string   "service"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "god_id"
  end

  create_table "tenant_maintenance_requests", force: :cascade do |t|
    t.integer  "tenant_id"
    t.integer  "maintenance_request_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "tenants", force: :cascade do |t|
    t.string   "full_name"
    t.string   "email"
    t.string   "mobile"
    t.integer  "property_id"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "tradies", force: :cascade do |t|
    t.string   "name"
    t.string   "mobile"
    t.string   "email"
    t.integer  "user_id"
    t.string   "skill"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "trady_company_id"
  end

  create_table "trady_companies", force: :cascade do |t|
    t.string   "company_name"
    t.string   "trading_name"
    t.string   "abn"
    t.boolean  "gst_registration"
    t.string   "address"
    t.boolean  "mailing_address_same"
    t.string   "mailing_address"
    t.string   "mobile_number"
    t.string   "email"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "user_conversations", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "conversation_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                           null: false
    t.string   "crypted_password"
    t.string   "salt"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "reset_password_token"
    t.datetime "reset_password_token_expires_at"
    t.datetime "reset_password_email_sent_at"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", using: :btree
  end

end
