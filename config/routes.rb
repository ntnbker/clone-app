Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  
  ###################################################
  ##########SETUP RESOURCES/ROUTES###################
  ###################################################
    root :to => 'pages#home'
    post 'route_user_type' =>"pages#create"
  
  ###################################################
  ##########USER RESOURCES/ROUTES####################
  ###################################################
    resources :user_sessions, only:[:create]
    resources :users, only:[:create,:update]
    get 'sign_up' => 'users#new', :as =>:sign_up
    get 'login' => 'user_sessions#new', :as => :login
    get 'menu-login' => 'user_sessions#menu_bar_login_form_new', :as => :menu_login
    post 'menulogin' => 'user_sessions#menu_bar_login_form_create'
    delete 'logout' => 'user_sessions#destroy', :as => :logout
    resources :password_resets, only:[:new, :create, :edit,:update]
    resources :passwords, only:[:edit, :update]
    resources :gods, only:[:show]
    resources :gods do 
      resources :services, only:[:new,:create, :update]
    end 
  
  ###################################################
  ##########AGENT ROLE RESOURCES/ROUTES##############
  ###################################################
    resources :agents, only:[:show,:update, :new, :create]
    resources :agent_maintenance_requests, only:[:index,:show]
    resources :agency_admins, only:[:new, :create, :show]
    resources :agencies, only:[:new, :create]

    resources :agency_admin_maintenance_requests, only:[:index, :show] 
  ###################################################
  ##########LANDLORD ROLE RESOURCES/ROUTES###########
  ###################################################
    resources :landlords, only:[:create]
    resources :landlord_maintenance_requests, only:[:index, :show]
    post 'update-landlord' => 'landlords#update', :as => :update_landlord
    post 'create-and-notify-landlord' => 'landlords#create_and_notify_landlord', :as =>:create_and_notify_landlord
    post "update-and-notify-landlord" => 'landlords#update_and_notify_landlord', :as =>:update_and_notify_landlord
  ###################################################
  ##########TENANT ROLE RESOURCES/ROUTES###########
  ###################################################
    resources :tenants, only:[:show, :index]
    resources :tenant_maintenance_requests, only:[:index, :show]
  ###################################################
  ##########MR RESOURCES/ROUTES######################
  ###################################################
    get 'ordered_maintenance_requests' => "maintenance_requests#ordered_maintenance_requests"
    resources :maintenance_requests, only:[:index,:new,:create,:destroy,:update, :show]
  
  ###################################################
  ##########MESSAGING RESOURCES/ROUTES###############
  ###################################################
    resources :messages
    resources :conversations
  
  
  ###################################################
  ##########INVOICE RESOURCES/ROUTES#################
  ###################################################
    resources :invoices, only:[:new, :create, :edit, :show]
    get "invoice_email" => "invoices#send_invoice_email", :as => :invoice_email
    get "confirm_company_invoice" =>"invoices#edit_trady_company_invoice"
    put "update_company_invoice" =>"invoices#update_trady_company_invoice"
    post "send_invoice" => "invoices#send_invoice", :as => :send_invoice
    get "invoice_sent_success" => "invoices#invoice_sent_success", :as=> :invoice_sent_success
    put 'update_invoice' => "invoices#update"

    get "new_additional_invoice" => "invoices#new_additional_invoice", :as=> :new_additional_invoice
    post"submit_additional_invoice" => "invoices#create_additional_invoice" 
  ###################################################
  ##########SINGLE INVOICE RESOURCES/ROUTES######
  ###################################################
    resources :single_invoices, only:[:new, :create, :edit, :show]
    put "update_single_invoice"=>"single_invoices#update"
    post "send_single_invoice" => "single_invoices#send_single_invoice", :as => :send_single_invoice
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

  ###################################################
  ##########TRADIE RESOURCES/ROUTES#################
  ###################################################
    get "trady_information" => 'tradies#trady_information', :as=>:trady_information
    resources :tradies, only:[:create]
    resources :trady_companies, only:[:new, :create, :edit, :update]
    resources :trady_maintenance_requests, only:[:index, :show]
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
  ###################################################################
  ##########TRADY AND TENANT APPOINTMENTS RESOURCES/ROUTES###########
  ###################################################################
    resources :appointments, only:[:new,:create,:show, :edit, :update]
    post "accept_appointment" =>"appointments#accept_appointment", :as =>:accept_appointment

  ###################################################################
  ##########LANDLORD AND TENANT APPOINTMENTS RESOURCES/ROUTES########
  ###################################################################
    resources :landlord_appointments, only:[:new,:create,:show, :edit]
    put "update_landlord_appointment" =>"landlord_appointments#update"
    post "accept_landlord_appointment" =>"landlord_appointments#accept_appointment", :as =>:accept_landlord_appointment
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
    resources :summaries, only:[:index]
  ###################################################
  ##########AGENT EMAILS RESOURCES/ROUTES############
  ################################################### 
    resources :agent_emails, only:[:index]
 end
