Rails.application.routes.draw do
  get 'lists/index'

  get 'lists/show'

  root 'boards#index'

  devise_for :users

  resources :boards do
    resources :lists
  end

  # Custon Get Routes
  # Custon Post Routes
  # Custon Put Routes
  # Custon Delete Routes
end
