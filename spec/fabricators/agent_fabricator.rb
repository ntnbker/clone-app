Fabricator(:agent) do 
  first_name {Faker::Name.name_with_middle}
  last_name {Faker::Name.name_with_middle}
  email {Faker::Internet.email}
  phone {Faker::PhoneNumber.cell_phone}
  
end 


