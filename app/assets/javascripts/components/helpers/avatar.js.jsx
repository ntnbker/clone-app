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

  handleError() {
    this.setState({ imageUri: this.props.defaultImage || '/default-avatar.png' });
  },

  render: function() {
    const { imageUri } = this.state;
    return (
      <img
        id="avatar"
        {...this.props}
        src={imageUri}
        onError={this.handleError}
        alt="Avatar Image"
      />
    )
  }
});
