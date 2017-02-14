class TradyMailer < ActionMailer::Base
  default from: 'from@example.com'
  def request_quote_email(trady_object, maintenance_request_object)
    @trady = trady_object
    @maintenance_request = maintenance_request_object
    track user: @trady.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(to:@trady.email, subject:"A request for a quote on a job")
  end

  def approved_quote_email(quote_object,trady_object, maintenance_request_object)
    @quote = quote_object
    @maintenance_request = maintenance_request_object
    @trady = trady_object
    track user: @trady.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(to:@trady.email, subject:"Quote Accepted")
  end

  def job_cancelled_email(trady_object, maintenance_request_object)
    @maintenance_request = maintenance_request_object
    @trady = trady_object
    mail(to:@trady.email, subject:"Job Cancelled")
  end

  def quote_declined_email(quote_object,trady_object, maintenance_request_object)
    @quote = quote_object
    @maintenance_request = maintenance_request_object
    @trady = trady_object
    mail(to:@trady.email, subject:"Quote Declined")
  end

  def appointment_accepted_email(maintenance_request_object,appointment_object, trady_object, tenant_object)
    @maintenance_request = maintenance_request_object
    @appointment = appointment_object
    @trady = trady_object
    @tenant = tenant_object
    track user: @trady.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(to:@trady.email, subject:"Appointment Accepted")
  end



end 


