Fabricator(:tenant) do 
  full_name {Faker::Name.name_with_middle}
  email {Faker::Internet.email}
  mobile {Faker::PhoneNumber.cell_phone}
  
end 


