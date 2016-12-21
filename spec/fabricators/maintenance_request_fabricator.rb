Fabricator(:maintenance_request) do 
  name {Faker::Name.name_with_middle}
  email {Faker::Internet.email}
  mobile {Faker::PhoneNumber.cell_phone}
  service_type "Plumber"
  maintenance_heading "This is a test heading"
  maintenance_description {Faker::Lorem.paragraph}
  image 0

end 


