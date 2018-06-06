require_relative 'boot'

require 'rails/all'
# require 'tod'
# require 'tod/core_extensions'
# require 'chronic'
# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Realestate
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.autoload_paths += %W( #{config.root}/app/reminder_workers/agency_admin)
    config.autoload_paths += %W( #{config.root}/app/reminder_workers/agent)
    config.autoload_paths += %W( #{config.root}/app/reminder_workers/landlord)
    config.autoload_paths += %W( #{config.root}/app/reminder_workers/trady)
    config.autoload_paths += %W( #{config.root}/app/reminder_workers/tenant)
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*', :headers => :any, :methods => [:get, :post, :options]
      end
    end
  end
end




