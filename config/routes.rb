Rails.application.routes.draw do

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'application#index'

  resources :emails
  resources :images
  mount_griddler

  namespace :api, module: :api, defaults: { format: :json } do
     resources :images, only: [:index]
  end
end