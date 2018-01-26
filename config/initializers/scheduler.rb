# require 'rufus-scheduler'

# #scheduler = Rufus::Scheduler::singleton

# # jobs go below here.

# # scheduler.every '2m' do
# #   # do stuff
# #   ReminderQueueWorker.perform_async
# # end


# scheduler = Rufus::Scheduler.new(:lockfile => ".rufus-scheduler.lock")

# unless scheduler.down?

#   scheduler.every("2d") do
#     # ...
#     ReminderQueueWorker.perform_async
#   end
# end


require 'sidekiq'
require 'sidekiq-scheduler'

Sidekiq.configure_server do |config|
  schedule_file = 'config/schedule.yml'

  config.on(:startup) do
    if ENV['SCHEDULER'] == 'yes'
      Sidekiq.schedule = YAML.load_file(schedule_file)

      Sidekiq::Scheduler.listened_queues_only = false
      Sidekiq::Scheduler.load_schedule!
    end
  end
end






