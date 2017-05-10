class AgencyEmail
  def self.find_all
    accounts = []
    AgencyAdmin.all.each do |agent|
      accounts << {:email => agent.email}
    end
    Agent.all.each do |agent|
      accounts << {:email => agent.email}
    end
    return accounts
  end

end 