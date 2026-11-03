Rails.application.routes.draw do

  resources :players do
    collection do
      post :import
    end
  end

  root "players#index"

end
