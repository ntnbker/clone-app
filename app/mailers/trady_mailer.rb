class TradyMailer < ActionMailer::Base
  default from: 'from@example.com'
  def request_quote_email(trady_object, maintenance_request_object)
    @trady = trady_object
    @maintenance_request = maintenance_request_object
    
    mail(to:@trady.email, subject:"A request for a quote on a job")
  end
end 