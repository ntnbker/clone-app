Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  root :to => 'pages#home'
  resources :user_sessions, only:[:create]
  resources :users, only:[:create,:update]
  get 'sign_up' => 'users#new', :as =>:sign_up
  get 'login' => 'user_sessions#new', :as => :login
  post 'logout' => 'user_sessions#destroy', :as => :logout

  resources :landlords, only:[:create, :update]
  get 'landlord_sign_up' => 'landlords#new', :as =>:landlord_sign_up

  resources :agency_admins, only:[:create, :update]
  get 'agency_sign_up' => 'agency_admins#new', :as =>:agency_admin_sign_up


end
