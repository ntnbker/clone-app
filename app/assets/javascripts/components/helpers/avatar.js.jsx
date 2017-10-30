AvatarImage = React.createClass({

  getInitialState: function() {
    return {
      imageUri: this.props.imageUri || '/default-avatar.png',
    }
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      imageUri: nextProps.imageUri || this.state.imageUri,
    });
  },

  render: function() {
    const { imageUri } = this.state;
    return (
      <img {...this.props} id="avatar" src={imageUri} alt="Avatar Image"/>
    )
  }
})
