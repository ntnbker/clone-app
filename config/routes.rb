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
  resources :agency_admins, only:[:new, :create, :show]
  resources :agencies, only:[:new, :create]

  ###################################################
  ##########LANDLORD ROLE RESOURCES/ROUTES###########
  ###################################################
  resources :landlords, only:[:create, :update]
  get 'landlord_sign_up' => 'landlords#new', :as =>:landlord_sign_up
  post 'create_landlord' => 'landlords#create_and_notify_landlord', :as =>:create_and_notify_landlord

  ###################################################
  ##########TENANT ROLE RESOURCES/ROUTES###########
  ###################################################
  resources :tenants, only:[:show, :index]
  
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
  resources :invoices
  get "invoice_email" => "invoices#send_invoice_email", :as => :invoice_email
  get "confirm_company_invoice" =>"invoices#edit_trady_company_invoice"
  put "update_company_invoice" =>"invoices#update_trady_company_invoice"
  post "send_invoice" => "invoices#send_invoice", :as => :send_invoice
  get "invoice_sent_success" => "invoices#invoice_sent_success", :as=> :invoice_sent_success
  ###################################################
  ##########WORK ORDER INVOICE RESOURCES/ROUTES######
  ###################################################
  get "company_information" =>"work_order_invoices#edit_trady_company_invoice"
  get "new_company_information" =>"work_order_invoices#new_trady_company_invoice"
  put "company_information_invoice" => "work_order_invoices#update_trady_company_invoice"
  post "send_work_order_invoice" => "work_order_invoices#send_invoice", :as => :send_work_order_invoice
  put "change_work_order_invoice" => "work_order_invoices#update_invoice"
  resources :work_order_invoices

  ###################################################
  ##########VIEW INVOICES RESOURCES/ROUTES###########
  ###################################################
  resources :view_invoices, only:[:show]
  post "print_invoice" =>"view_invoices#print_invoice", :as=> :print_invoice

  ###################################################
  ##########PAYMENST RESOURCES/ROUTES################
  ###################################################
  resources :invoice_payments, only:[:create, :update, :edit]

  ###################################################
  ##########TRADIE RESOURCES/ROUTES#################
  ###################################################
  get "trady_information" => 'tradies#trady_information', :as=>:trady_information
  resources :tradies, only:[:create]
  resources :trady_companies
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

 end
