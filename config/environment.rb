# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

# require 'carrierwave/orm/activerecord'



ActionMailer::Base.smtp_settings = {
  :port           => ENV['SENDGRID_SMTP_PORT'],
  :address        => ENV['SENDGRID_SMTP_SERVER'],
  :user_name      => ENV['SENDGRID_USERNAME'],
  :password       => ENV['SENDGRID_PASSWORD'],
  :domain         => 'fast-scrubland-62955.herokuapp.com',
  :authentication => :plain,
  :enable_starttls_auto => true
}