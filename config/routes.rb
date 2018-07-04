Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
  mount ImageUploader::UploadEndpoint => "/images"
  mount InvoicePdfUploader::UploadEndpoint => "/upload_invoice_pdf"
  
  ###################################################
  ##########SETUP RESOURCES/ROUTES###################
  ###################################################
    root :to => 'pages#home'
    post 'route_user_type' =>"pages#create"
  ###################################################
  ##########STATIC PAGES RESOURCES/ROUTES############
  ###################################################
    get "general_terms_and_conditions"=> "pages#general_terms"
    get "privacy_policy"=> "pages#privacy_policy"
    get "about" => "pages#about"
    get "support" => "pages#support",:as=> "contact_us"
    get "tradie_terms_and_conditions" =>"pages#tradie_terms_and_conditions"
    get "agent_terms_and_conditions" => "pages#agent_terms_and_conditions"
  ###################################################
  ##########USER RESOURCES/ROUTES####################
  ###################################################
    resources :user_sessions, only:[:create]
    resources :users, only:[:create,:update]
    get 'sign_up' => 'users#new', :as =>:sign_up
    # get 'login' => 'user_sessions#new', :as => :login
    get 'login' => 'user_sessions#new', :as => :menu_login
    post 'menulogin' => 'user_sessions#create'
    delete 'logout' => 'user_sessions#destroy', :as => :logout
    resources :password_resets, only:[:new, :create, :edit,:update]
    resources :passwords, only:[:edit, :update]
    get "change_password"=> "passwords#change_password",:as=> :change_password
    patch "update_password"=>"passwords#update_password"
    get "set_password"=> "passwords#set_password",:as=> :set_password
    patch "confirm_password"=>"passwords#confirm_password"
    get "new_onboarding_password" =>"passwords#new_onboarding_password", :as => "new_onboarding_password"
    post "create_onboarding_password"=>"passwords#create_onboarding_password"
  
  ###################################################
  ##########AGENT ROLE RESOURCES/ROUTES##############
  ###################################################
    resources :agents, only:[:show,:update, :new, :create, :edit,:update]
    resources :agent_maintenance_requests, only:[:index,:show]
    resources :agency_admins, only:[:new, :create, :show, :edit, :update]
    resources :agency_admin_profile_images, only:[:create, :update]
    resources :agent_profile_images, only:[:create, :update]
    resources :agency_profile_images, only:[:create, :update]
    resources :agencies, only:[:new, :create, :edit, :update]
    get "register_agency_admin" => "agencies#new_agency_admin", :as=> "new_agency_admin_for_agency"
    post "register_agency_admin" => "agencies#register_agency_admin"
    get "edit_agency_registration" => "agencies#edit_agency_registration", :as=>"edit_agency_registration" 
    put 'update_agency_registration' => "agencies#update_agency_registration"
    
    get "agency_settings" => 'agencies#settings', :as => "agency_settings"
    resources :agency_admin_maintenance_requests, only:[:index, :show] 
  ###################################################
  ##########LANDLORD ROLE RESOURCES/ROUTES###########
  ###################################################
    resources :landlords, only:[:create]
    resources :landlord_maintenance_requests, only:[:index, :show]
    post "landlord_repair" => "landlord_actions#fix_myself"
    post "landlord_resolved_issue" => "landlord_actions#issue_resolved"
    post 'update-landlord' => 'landlords#update', :as => :update_landlord
    post 'create-and-notify-landlord' => 'landlords#create_and_notify_landlord', :as =>:create_and_notify_landlord
    post "update-and-notify-landlord" => 'landlords#update_and_notify_landlord', :as =>:update_and_notify_landlord
  ###################################################
  ##########TENANT ROLE RESOURCES/ROUTES###########
  ###################################################

    resources :tenants, only:[:show, :index, :edit ,:update, :create, :destroy]

    resources :tenant_maintenance_requests, only:[:index, :show]
    post "edit_tenant" => "tenants#update_tenant"
  ###################################################
  ##########MR RESOURCES/ROUTES######################
  ###################################################
    get 'ordered_maintenance_requests' => "maintenance_requests#ordered_maintenance_requests"
    resources :maintenance_requests, only:[:new,:create,:destroy]
    post "update_maintenance_request" => "maintenance_requests#update"
    post "update_maintenance_request_status"=> "maintenance_requests#update_status"
    post "duplicate_maintenance_request"=> "maintenance_requests#duplicate"
    post "split_maintenance_request" => "maintenance_requests#split"
    post "pre_approved"=> "maintenance_requests#preapproved"
    post "defer_maintenance"=> "maintenance_requests#defer"
  ###################################################
  ##########MESSAGING RESOURCES/ROUTES###############
  ###################################################
    resources :messages
    resources :conversations
    post "quote_messages"=>"messages#create_quote_messages", :as =>:quote_messages
    post "quote_request_messages"=> "messages#create_quote_request_message", :as=>:quote_request_messages
  
  ###################################################
  ##########INVOICE RESOURCES/ROUTES#################
  ###################################################
    resources :invoices, only:[:new, :create, :edit]
    get "invoices"=> "invoices#show", :as => :invoice
    get "invoice_email" => "invoices#send_invoice_email", :as => :invoice_email
    get "confirm_company_invoice" =>"invoices#edit_trady_company_invoice"
    put "update_company_invoice" =>"invoices#update_trady_company_invoice"
    post "send_invoice" => "invoices#send_invoice", :as => :send_invoice
    get "invoice_sent_success" => "invoices#invoice_sent_success", :as=> :invoice_sent_success
    put 'update_invoice' => "invoices#update"
    post "mark_as_paid" => "invoices#mark_as_paid"
    post "payment_reminder" => "invoices#payment_reminder"
    get "new_additional_invoice" => "invoices#new_additional_invoice", :as=> :new_additional_invoice
    post"submit_additional_invoice" => "invoices#create_additional_invoice" 
    post "void_invoice" => "invoices#void_invoice"
  ###################################################
  ##########WORK ORDER INVOICE RESOURCES/ROUTES######
  ###################################################
  # get "company_information" =>"work_order_invoices#edit_trady_company_invoice"
  # get "new_company_information" =>"work_order_invoices#new_trady_company_invoice"
  # put "company_information_invoice" => "work_order_invoices#update_trady_company_invoice"
  # post "send_work_order_invoice" => "work_order_invoices#send_invoice", :as => :send_work_order_invoice
  # put "change_work_order_invoice" => "work_order_invoices#update_invoice"
  # resources :work_order_invoices

  ###################################################
  ##########VIEW INVOICES RESOURCES/ROUTES###########
  ###################################################
    resources :view_invoices, only:[:show]
    post "print_invoice" =>"view_invoices#print_invoice", :as=> :print_invoice
    get "view_pdf_invoice" =>"view_invoices#show_pdf", :as=>:view_pdf_invoice
  ###################################################
  ##########PAYMENTS RESOURCES/ROUTES################
  ###################################################
  resources :invoice_payments, only:[:create, :update, :edit]

  ###################################################
  ########## INVOICE OPTIONS RESOURCES/ROUTES######
  ###################################################
    get "invoice_options"=>"invoice_options#show"

  ###################################################
  ########## UPLOADED INVOICES ######################
  ###################################################
    resources :uploaded_invoices, only:[:new, :create, :show, :edit, :update]
    post "send_pdf_invoice" => "uploaded_invoices#send_invoice", :as => :send_pdf_invoice
    post "void_uploaded_invoice" => "uploaded_invoices#void_invoice"
  ###################################################
  ##########TRADIE RESOURCES/ROUTES#################
  ###################################################
    get "trady_information" => 'tradies#trady_information', :as=>:trady_information
    resources :tradies, only:[:create, :edit, :update]
    post "update_services" => "tradies#update_skills"
    resources :trady_companies, only:[:new, :create, :edit, :update]
    resources :trady_maintenance_requests, only:[:index, :show]
    resources :trady_company_profile_images, only:[:create, :update]
    resources :trady_profile_images, only:[:create, :update]
    get "change_trady_company_information" => "trady_companies#change_trady_company_information", :as=> :change_trady_company_information
    patch "update_trady_company_information" => "trady_companies#update_trady_company_information", :as=> :update_trady_company_information
    get "edit_trady_company" => 'trady_companies#edit_trady_company_invoice_workflow', :as =>:edit_trady_company_path
    put "update_trady_company" => "trady_companies#update_trady_company_invoice_workflow"
    post "tradie_company_redirect"=>"trady_companies#trady_company_router", :as=>:trady_company_router
  ###################################################
  ##########QUOTES RESOURCES/ROUTES##################
  ###################################################
    resources :quotes, only:[:new,:create,:show,:edit,:update]
    get "quote_email" => "quotes#send_quote_email", :as => :quote_email
    get "show_quote" => "quotes#show_quote", :as => :show_quote
    post "quote_status" => "quotes#quote_status" 
    post "request_quote" => "quotes#landlord_requests_quote", :as => :request_quote 
    post "picks_quote" => "quotes#landlord_decides_quote", :as => :landlord_decides_quote
    post "forward_quote"=> "quotes#forward_quote", :as => :forward_quote
    post "quote_sent" => "quotes#quote_already_sent", :as => :quote_sent
  ###################################################
  ########## QUOTE OPTIONS RESOURCES/ROUTES######
  ###################################################
    get "quote_options" => "quote_options#show",:as=>:quote_options
  ###################################################
  ########## UPLOADED QUOTES ######################
  ###################################################
    resources :uploaded_quotes, only:[:new, :create, :show, :edit, :update]
    post "send_pdf_quote" => "uploaded_quotes#send_quote", :as => :send_pdf_quote
    get "uploaded_quote_sent" => "uploaded_quotes#uploaded_quote_sent", :as => :uploaded_quote_sent
  ###################################################
  ########## QUOTES IMAGES ######################
  ###################################################
    post "quote_image"=> "quote_images#create", :as=> :upload_quote_image
  ###################################################################
  ##########TRADY AND TENANT APPOINTMENTS RESOURCES/ROUTES###########
  ###################################################################
    resources :appointments, only:[:new,:create,:show, :edit, :update]
    post "accept_appointment" =>"appointments#accept_appointment", :as =>:accept_appointment
    post "decline_appointment" => "appointments#decline_appointment"
    post "cancel_appointment" => "appointments#cancel_appointment"
    post "appointment_already_made" => "appointments#appointment_already_made"
  ###################################################################
  ##########LANDLORD AND TENANT APPOINTMENTS RESOURCES/ROUTES########
  ###################################################################
    resources :landlord_appointments, only:[:new,:create,:show, :edit]
    put "update_landlord_appointment" =>"landlord_appointments#update"
    post "accept_landlord_appointment" =>"landlord_appointments#accept_appointment", :as =>:accept_landlord_appointment
    post "decline_landlord_appointment" => "landlord_appointments#decline_appointment", :as =>:decline_landlord_appointment
    post "cancel_landlord_appointment" => "landlord_appointments#cancel_appointment", :as =>:cancel_landlord_appointment
  ###################################################
  ##########COMMENTS RESOURCES/ROUTES################
  ###################################################
    resources :comments, only:[:create]

  
  ###################################################
  ##########ACTION STATUS RESOURCES/ROUTES###########
  ###################################################
    post "job_completed" => "action_statuses#job_complete"

  ###################################################
  ##########SEARCH RESOURCES/ROUTES###########
  ###################################################
    get 'search', to: "search_maintenance_requests#search_maintenance_request", :as => :search_maintenance_request

  ###################################################
  ##########SEARCH RESOURCES/ROUTES##################
  ###################################################
    get "maintenance_request_filter", to: "maintenance_request_filters#filtered_maintenance_requests", :as => :filtered_maintenance_requests
    get "trady_maintenance_request_filter", to: "maintenance_request_filters#trady_filtered_maintenance_requests", :as => :trady_filtered_maintenance_requests
    
  ###################################################
  ##########AGENT EMAILS RESOURCES/ROUTES############
  ################################################### 
    resources :agent_emails, only:[:index]
  ###################################################
  ##########PRINT STATUS RESOURCES/ROUTES############
  ###################################################
    post "update_print_status"=> "print_statuses#update" 
  ###################################################
  ##########REASSIGN AGENTS RESOURCES/ROUTES############
  ###################################################
    post "reassign_to"=> "reassign_maintenance_requests#reassign"

  ###################################################
  ##########REASSIGN AGENTS RESOURCES/ROUTES############
  ###################################################
    post "update_instruction"=> "instructions#update"

  ###################################################
  ##########REASSIGN AGENTS RESOURCES/ROUTES#########
  ################################################### 
    post "update_images"=> "images#update"
  ###################################################
  ##########WORK ORDER RESOURCES/ROUTES#########
  ################################################### 
    post "cancel_work_order"=> "work_orders#cancel_work_order"

  ###################################################
  ##########JFMO REGISTER TRADIE RESOURCES/ROUTES####
  ###################################################
  ###################################################
  ##########REMINDER KILLER RESOURCES/ROUTES#########
  ################################################### 
  post "/stop_quote_reminder" => "reminder_killers#stop_quote_request_reminder", :as => :stop_quote_reminder
  post "/stop_appointment_reminder" => "reminder_killers#stop_appointment_reminder", :as => :stop_appointment_reminder
  post "/stop_invoice_reminder" => "reminder_killers#stop_invoice_reminder", :as => :stop_invoice_reminder
    

  ###################################################
  ##########JFMO REGISTER TRADIE RESOURCES/ROUTES####
  ###################################################
  resources :tradie_registrations, only:[:new, :create, :edit, :update]
  get "register_tradie_company" => "tradie_registrations#new_tradie_company", :as=> "register_trady_company"
  post "create_tradie_company" => "tradie_registrations#create_tradie_company" 
  get "edit_tradie_company" => "tradie_registrations#edit_tradie_company", :as=> "edit_register_tradie_company"
  put "update_tradie_company" => "tradie_registrations#update_tradie_company"
 

  ###################################################
  ##########TRADIE PAYMENTS RESOURCES/ROUTES#########
  ################################################### 
    resources :trady_payment_registrations, only:[:new, :create, :update]

  ###################################################
  ##########SERVICES PAYMENTS RESOURCES/ROUTES#######
  ################################################### 
    resources :services, only:[:new,:create, :update, :index]
    post "add_services"=>"services#add_services"
    get "edit_services"=>"services#edit_services", :as => "edit_services"
    get "new_service_onboarding" => "services#new_service_onboarding", :as=> "new_service_onboarding"
    post "new_service_onboarding" => "services#create_service_onboarding"
    get "submit_service" => "services#submit_service"
    
  ###########################################################
  ##########TRADY TERMS AND CONDITIONS RESOURCES/ROUTES######
  ###########################################################
  resources :tradie_term_agreements, only:[:new, :create]
  get "onboarding_tradie_terms_and_conditions" => "tradie_term_agreements#new_terms_and_conditions_onboarding", :as => :onboarding_tradie_terms_and_conditions
  post "onboarding_tradie_terms_and_conditions" => "tradie_term_agreements#create_terms_and_conditions_onboarding"
  get "join_just_find_me_one" => "tradie_term_agreements#non_jfmo_terms_and_conditions_onboarding", :as=> :join_just_find_me_one
  post "join_just_find_me_one" => "tradie_term_agreements#create_non_jfmo_terms_and_conditions_onboarding"
  ############################################
  ##########PAYMENT RESOURCES/ROUTES#########
  ############################################
    resources :payments, only:[:new, :create]


  ###########################################################
  ##########AGENCY TERMS AND CONDITIONS RESOURCES/ROUTES#####
  ###########################################################
  resources :agency_term_agreements, only:[:new, :create, :edit, :update]

  ###########################################################
  ##########AGENCY PAYMENT REGISTRATION RESOURCES/ROUTES#####
  ###########################################################
  resources :agency_payment_registrations, only:[:new, :create]

  ###########################################################
  ##########JFMO RESOURCES/ROUTES#####
  ###########################################################
  post "just_find_me_one" => "jfmo_tradies#find_tradies"
  resources :recruits, only: [:new, :create, :index, :show]
  post "quote_request_for_recruit" => "recruits#quote_request"

  ###########################################################
  ##########INSURANCE RESOURCES/ROUTES#####
  ###########################################################
  resources :insurances, only: [:new, :create, :edit, :update]
  get "new_insurance_onboarding" => "insurances#new_insurance_onboarding", :as => "new_insurance_onboarding"
  post "new_insurance_onboarding" => "insurances#create_insurance_onboarding"
  get "edit_insurance_onboarding/:id" => "insurances#edit_insurance_onboarding", :as => "edit_insurance_onboarding"
  put "edit_insurance_onboarding" => "insurances#update_insurance_onboarding"
  ###########################################################
  ##########LICENSE RESOURCES/ROUTES#####
  ###########################################################
  resources :licenses, only: [:new, :create, :edit, :update]
  get "new_license_onboarding" => "licenses#new_license_onboarding",  :as => "new_license_onboarding"
  post "new_license_onboarding" => "licenses#create_license_onboarding"
  get "edit_license_onboarding/:id" => "licenses#edit_license_onboarding", :as => "edit_license_onboarding"
  put "edit_license_onboarding" => "licenses#update_license_onboarding"
  ###########################################################
  ##########RECEIPTS RESOURCES/ROUTES#####
  ###########################################################
  resources :receipts, only:[:index,:show]

  ###########################################################
  ##########CONTACT US RESOURCES/ROUTES#####
  ###########################################################
  post "contact_us" => "contact_us#create"


  ###########################################################
  ##########RECEIPTS RESOURCES/ROUTES#####
  ###########################################################
  resources :screen_tradies, only:[:index, :show]
  post "screen_tradies/:id" => "screen_tradies#screen"
  ###########################################################
  ##########TENANT AVAILABILITY AND ACCESS RESOURCES/ROUTES#####
  ###########################################################
  
  post "update_availability_access" => "tenant_availabilities#update"

  ###########################################################
  ##########ADDRESS RESOURCES#####
  ###########################################################
  post "update_address" => "addresses#update"

  


 end



