web: bundle exec puma -C config/puma.rb
worker: bundle exec sidekiq -e production -C config/sidekiq.yml
scheduler: env SCHEDULER=yes bundle exec sidekiq -C config/schedule.yml
release: rake db:migrate