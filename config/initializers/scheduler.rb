require 'rufus-scheduler'

#scheduler = Rufus::Scheduler::singleton

# jobs go below here.

# scheduler.every '2m' do
#   # do stuff
#   ReminderQueueWorker.perform_async
# end


scheduler = Rufus::Scheduler.new(:lockfile => ".rufus-scheduler.lock")

unless scheduler.down?

  scheduler.every("2m") do
    # ...
    ReminderQueueWorker.perform_async
  end
end

