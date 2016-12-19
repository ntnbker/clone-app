Rails.application.routes.draw do


  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  root :to => 'pages#home'
  resources :user_sessions, only:[:create]
  resources :users, only:[:create,:update]
  resources :gods, only:[:show]
  resources :gods do 
    resources :services, only:[:new,:create, :update]
  end 
  resources :agents, only:[:show,:update]
  post 'route_user_type' =>"pages#create"
  get 'sign_up' => 'users#new', :as =>:sign_up
  get 'login' => 'user_sessions#new', :as => :login
  get 'menu-login' => 'user_sessions#menu_bar_login_form_new', :as => :menu_login
  post 'menulogin' => 'user_sessions#menu_bar_login_form_create'
  delete 'logout' => 'user_sessions#destroy', :as => :logout

  resources :landlords, only:[:create, :update]
  get 'landlord_sign_up' => 'landlords#new', :as =>:landlord_sign_up

  #resources :agency_admins, only:[:create, :update, :show]
  resources :agency_admins, only:[:create, :update, :show] do 
    resources :maintenance_requests, only:[:index]
  end 
  get 'agency_sign_up' => 'agency_admins#new', :as =>:agency_admin_sign_up

  resources :maintenance_requests, only:[:new,:create,:destroy,:update, :show]
  
  resources :agent_maintenance_requests, only:[:new,:create,:destroy,:update, :show]
  resources :password_resets, only:[:new, :create, :edit,:update]
  resources :tenants, only:[:show, :index]
  resources :messages



  # get "forgot_password", to: "forgot_password#new"
  # get "forgot_password_confirmation", to: "forgot_password#confirm"
  # get "expired_token", to: "password_reset#expired_token"
  # get "register/:token", to: "users#new_with_invitation_token", as:"register_with_token"


end
