class ApplicationMailer < ActionMailer::Base
  # default from: 'from@example.com'
  # layout 'mailer'
  def send_maintenance_request_email(maintenance_request)
    @maintenance_request = maintenance_request
    mail from:"ron@email.com", to:maintenance_request.email, subject:"Hi #{maintenance_request.name} your maintenance request is now being processed"
  end

end


# context "sends emails" do 
#           after {ActionMailer::Base.deliveries.clear}
          
#           it "sends an email when a user signs up with valid inputs" do 
#             charge = double('charge')
#             charge.stub(:successful?).and_return(true)
#             StripeWrapper::Charge.stub(:create).and_return(charge)
#             post :create, token:123, user: {email:"dom@email.com", password:"123", full_name:"dom john"}
#             expect(ActionMailer::Base.deliveries).not_to be_empty
#           end 