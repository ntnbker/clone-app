Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  root :to => 'pages#home'
  resources :user_sessions, only:[:create]
  resources :users, only:[:create,:update]
  resources :gods, only:[:show]
  resources :gods do 
    resources :services, only:[:new,:create, :update]
  end 
  resources :agents, only:[:show,:update]
  post 'route_user_type' =>"pages#route_user_type"
  get 'sign_up' => 'users#new', :as =>:sign_up
  get 'login' => 'user_sessions#new', :as => :login
  delete 'logout' => 'user_sessions#destroy', :as => :logout

  resources :landlords, only:[:create, :update]
  get 'landlord_sign_up' => 'landlords#new', :as =>:landlord_sign_up

  resources :agency_admins, only:[:create, :update]
  get 'agency_sign_up' => 'agency_admins#new', :as =>:agency_admin_sign_up


end
