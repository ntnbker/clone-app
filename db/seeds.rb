# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


  user = User.create(email:"martin@email.com", password:"12345")
  god = God.create(full_name:"Martin", user_id:user.id)
  role = Role.create(user_id:user.id, roleable_type:"God", roleable_id:god.id)


  agent = MainUser.create(main_user_type:"Agent", god_id:god.id)
  tenant = MainUser.create(main_user_type:"Tenant", god_id:god.id)
  landlord = MainUser.create(main_user_type:"Landlord", god_id:god.id)

  Service.create(service:"Plumber")
  Service.create(service:"Electrician")
  Service.create(service:"Carpenter")