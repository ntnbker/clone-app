var About = React.createClass({
  render() {
    return (
      <div className="about">
        <div className="about-top-image position-rl">
          <p className="position-ab about-slogan">Always getting things done.</p>
        </div>
        <div className="about-content">
          <AvatarImage className="about-logo" alt="Logo" imageUri="/assets/logo.png" />
          <p className="app-name">Maintenance App</p>
          <p className="level-1">
            Maintenance App is a cloud based platform that helps organize and log maintenance issues involving your properties.Since 2015 Maintenance App has strived to make the experience of dealing with maintenance issues the best it can be. We designed our platform by thinking of the needs and desires of property managers, landlords, tenants, and tradies. By allowing property managers to quickly organize maintenance requests submitted by tenants we help them accomplish their work quickly and efficiently.
          </p>
          <p className="level-1">
            Using our on demand network of verified tradies, agents and landlord can effortlessly request competitive quotes for jobs that are required to be completed. We give property managers and landlords competitive quotes to help maintain their properties in great condition.
          </p>
          <p className="level-1">
            We offer tradies an opportunity to grow their business by receiving high quality leads, which is why many tradies love being on our network. We love helping out small businesses reach their full potential.
          </p>
          <p className="level-1">
            We want to thank you for joining us, we hope you enjoy our platform!
          </p>
        </div>
        <div className="about-bottom-image">
          <div className="one-image first-image"></div>
          <div className="one-image second-image"></div>
          <div className="one-image third-image"></div>
        </div>
      </div>
    )
  }
})
