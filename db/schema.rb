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

ActiveRecord::Schema.define(version: 20180525094611) do

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

  create_table "action_statuses", force: :cascade do |t|
    t.integer  "maintenance_request_id"
    t.integer  "agent_id"
    t.integer  "agency_admin_id"
    t.integer  "landlord_id"
    t.integer  "tenant_id"
    t.integer  "trady_id"
    t.text     "maintenance_request_status"
    t.text     "agent_last_action"
    t.text     "agent_status"
    t.text     "landlord_last_action"
    t.text     "landlord_status"
    t.text     "trady_last_action"
    t.text     "trady_status"
    t.text     "tenant_last_action"
    t.text     "tenant_status"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "action_category"
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

  create_table "agency_admin_profile_images", force: :cascade do |t|
    t.integer  "agency_admin_id"
    t.text     "image_data"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "agency_admins", force: :cascade do |t|
    t.string  "email"
    t.string  "first_name"
    t.string  "last_name"
    t.integer "user_id"
    t.string  "mobile_phone"
    t.integer "agency_id"
    t.string  "license_number"
  end

  create_table "agency_profile_images", force: :cascade do |t|
    t.integer  "agency_id"
    t.text     "image_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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

  create_table "agent_profile_images", force: :cascade do |t|
    t.integer  "agent_id"
    t.text     "image_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "agents", force: :cascade do |t|
    t.string   "last_name"
    t.string   "email"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "name"
    t.string   "mobile_phone"
    t.string   "license_type"
    t.string   "license_number"
    t.integer  "agency_id"
    t.integer  "user_id"
  end

  create_table "ahoy_messages", force: :cascade do |t|
    t.string   "token"
    t.text     "to"
    t.integer  "user_id"
    t.string   "user_type"
    t.string   "mailer"
    t.text     "subject"
    t.datetime "sent_at"
    t.datetime "opened_at"
    t.datetime "clicked_at"
    t.integer  "maintenance_request_id"
    t.index ["token"], name: "index_ahoy_messages_on_token", using: :btree
    t.index ["user_id", "user_type"], name: "index_ahoy_messages_on_user_id_and_user_type", using: :btree
  end

  create_table "appointments", force: :cascade do |t|
    t.integer  "trady_id"
    t.integer  "tenant_id"
    t.integer  "maintenance_request_id"
    t.date     "date"
    t.time     "time"
    t.string   "status"
    t.text     "comment"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "landlord_id"
    t.string   "current_user_role"
    t.string   "appointment_type"
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

  create_table "comments", force: :cascade do |t|
    t.integer  "trady_id"
    t.integer  "tenant_id"
    t.integer  "appointment_id"
    t.text     "body"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "landlord_id"
  end

  create_table "conversations", force: :cascade do |t|
    t.integer  "sender_id"
    t.integer  "recipient_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "conversation_type"
    t.integer  "maintenance_request_id"
    t.integer  "quote_id"
    t.integer  "quote_request_id"
  end

  create_table "current_roles", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "customer_profiles", force: :cascade do |t|
    t.integer  "trady_id"
    t.integer  "agency_id"
    t.string   "customer_id"
    t.boolean  "terms_and_conditions"
    t.datetime "created_at",                                   null: false
    t.datetime "updated_at",                                   null: false
    t.string   "payment_status",       default: "Outstanding"
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

  create_table "images", force: :cascade do |t|
    t.integer  "maintenance_request_id"
    t.text     "image_data"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "instructions", force: :cascade do |t|
    t.boolean  "read_instruction"
    t.integer  "user_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "insurances", force: :cascade do |t|
    t.string   "insurance_company"
    t.string   "policy_number"
    t.date     "policy_expiry_date"
    t.integer  "trady_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.text     "image_data"
    t.boolean  "insured"
  end

  create_table "invoice_items", force: :cascade do |t|
    t.integer  "invoice_id"
    t.text     "item_description"
    t.float    "amount"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "pricing_type"
    t.float    "hours"
    t.float    "total_per_hour"
  end

  create_table "invoice_payments", force: :cascade do |t|
    t.integer  "invoice_id"
    t.string   "payment_status"
    t.integer  "amount_paid"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.date     "date"
  end

  create_table "invoice_schedulers", force: :cascade do |t|
    t.date     "run_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "invoices", force: :cascade do |t|
    t.integer  "trady_id"
    t.integer  "maintenance_request_id"
    t.float    "amount"
    t.datetime "created_at",                                                              null: false
    t.datetime "updated_at",                                                              null: false
    t.boolean  "tax"
    t.integer  "ledger_id"
    t.float    "gst_amount"
    t.date     "due_date"
    t.boolean  "delivery_status"
    t.boolean  "print_status"
    t.string   "invoice_number"
    t.text     "trady_invoice_reference"
    t.boolean  "paid",                                            default: false
    t.integer  "quote_id"
    t.string   "mapp_payment_status",                             default: "Outstanding"
    t.decimal  "service_fee",             precision: 8, scale: 2
    t.boolean  "active",                                          default: true
    t.text     "void_reason"
  end

  create_table "jfmo_requests", force: :cascade do |t|
    t.integer  "maintenance_request_id"
    t.integer  "tradie_participation_amount", default: 0
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
  end

  create_table "landlords", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "mobile"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  create_table "ledgers", force: :cascade do |t|
    t.float    "grand_total"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "maintenance_request_id"
    t.integer  "super_ledger_id"
  end

  create_table "licenses", force: :cascade do |t|
    t.text     "image_data"
    t.integer  "trady_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.boolean  "licensed"
    t.string   "license_number"
    t.string   "license_type"
  end

  create_table "logs", force: :cascade do |t|
    t.integer  "maintenance_request_id"
    t.string   "action"
    t.string   "name"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "main_users", force: :cascade do |t|
    t.string   "main_user_type"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "god_id"
  end

  create_table "maintenance_request_images", force: :cascade do |t|
    t.string   "images",                 default: [],              array: true
    t.integer  "maintenance_request_id"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.text     "image_data"
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
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.integer  "agent_id"
    t.integer  "tenant_id"
    t.string   "person_in_charge"
    t.string   "real_estate_office"
    t.string   "agent_name"
    t.string   "agent_email"
    t.string   "agent_mobile"
    t.string   "service_type"
    t.integer  "property_id"
    t.integer  "agency_id"
    t.integer  "agency_admin_id"
    t.integer  "trady_id"
    t.text     "availability_and_access"
    t.string   "work_order_number"
    t.string   "agency_business_name"
    t.text     "preapproved_note"
    t.string   "jfmo_status",             default: "Passive"
  end

  create_table "messages", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.text     "body"
    t.integer  "conversation_id"
    t.string   "role"
  end

  create_table "properties", force: :cascade do |t|
    t.integer "agency_admin_id"
    t.integer "landlord_id"
    t.string  "property_address"
    t.integer "agency_id"
  end

  create_table "queries", force: :cascade do |t|
    t.integer "maintenance_request_id"
    t.string  "user_role"
    t.string  "tradie"
    t.string  "address"
  end

  create_table "quote_images", force: :cascade do |t|
    t.integer  "quote_id"
    t.text     "image_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "quote_items", force: :cascade do |t|
    t.integer "quote_id"
    t.string  "item_description"
    t.float   "amount"
    t.string  "pricing_type"
    t.float   "hours"
    t.float   "total_per_hour"
    t.float   "min_price"
    t.float   "max_price"
  end

  create_table "quote_requests", force: :cascade do |t|
    t.integer  "maintenance_request_id"
    t.integer  "trady_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "quote_id"
    t.boolean  "quote_sent"
    t.boolean  "expired",                default: false
  end

  create_table "quotes", force: :cascade do |t|
    t.float    "amount"
    t.integer  "maintenance_request_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "trady_id"
    t.string   "status"
    t.boolean  "delivery_status"
    t.boolean  "tax"
    t.float    "gst_amount"
    t.boolean  "forwarded_to_landlord"
    t.string   "quote_number"
    t.text     "trady_quote_reference"
    t.boolean  "trady_fee"
    t.integer  "quote_request_id"
  end

  create_table "reminder_schedulers", force: :cascade do |t|
    t.date     "run_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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

  create_table "skills", force: :cascade do |t|
    t.string   "skill"
    t.integer  "trady_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "super_ledgers", force: :cascade do |t|
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "maintenance_request_id"
    t.integer  "ledger_id"
    t.float    "grand_total"
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
    t.string   "name"
  end

  create_table "tradies", force: :cascade do |t|
    t.string   "name"
    t.string   "mobile"
    t.string   "email"
    t.integer  "user_id"
    t.string   "skill"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.integer  "trady_company_id"
    t.string   "company_name"
    t.boolean  "jfmo_participant"
    t.boolean  "payment_registration", default: false
    t.string   "registration_status"
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
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "account_name"
    t.string   "bsb_number"
    t.string   "bank_account_number"
    t.integer  "trady_id"
    t.string   "profession_license_number"
    t.string   "landline"
  end

  create_table "trady_company_profile_images", force: :cascade do |t|
    t.integer  "trady_company_id"
    t.text     "image_data"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "trady_payment_errors", force: :cascade do |t|
    t.text   "message"
    t.string "http_status"
    t.string "error_type"
    t.string "error_code"
    t.string "charge_id"
  end

  create_table "trady_profile_images", force: :cascade do |t|
    t.integer  "trady_id"
    t.text     "image_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trady_statuses", force: :cascade do |t|
    t.integer  "maintenance_request_id"
    t.string   "status"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "uploaded_invoices", force: :cascade do |t|
    t.integer  "maintenance_request_id"
    t.datetime "created_at",                                                             null: false
    t.datetime "updated_at",                                                             null: false
    t.integer  "trady_id"
    t.boolean  "delivery_status"
    t.text     "pdf_data"
    t.boolean  "paid",                                           default: false
    t.float    "total_invoice_amount"
    t.date     "due_date"
    t.decimal  "service_fee",            precision: 8, scale: 2
    t.string   "mapp_payment_status",                            default: "Outstanding"
    t.boolean  "active",                                         default: true
    t.text     "void_reason"
  end

  create_table "uploaded_quotes", force: :cascade do |t|
    t.string   "quotes",                 default: [],              array: true
    t.integer  "maintenance_request_id"
    t.boolean  "delivery_status"
    t.integer  "trady_id"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "status"
  end

  create_table "urls", force: :cascade do |t|
    t.text     "short_url"
    t.text     "original_url"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "user_conversations", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "conversation_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                                           null: false
    t.string   "crypted_password"
    t.string   "salt"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "reset_password_token"
    t.datetime "reset_password_token_expires_at"
    t.datetime "reset_password_email_sent_at"
    t.string   "set_password_token"
    t.string   "id_token"
    t.boolean  "password_set",                    default: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", using: :btree
  end

end
