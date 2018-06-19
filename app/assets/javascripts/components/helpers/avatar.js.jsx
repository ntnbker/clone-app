AvatarImage = React.createClass({
  getInitialState: function() {
    return {
      imageUri: this.props.imageUri || this.props.defaultImage || defaultImages.defaultAvatar,
    }
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      imageUri: nextProps.imageUri || this.state.imageUri,
    });
  },

  handleError() {
    this.setState({ imageUri: this.props.defaultImage || defaultImages.defaultAvatar });
  },

  render: function() {
    const { imageUri } = this.state;
    return (
      <img
        id="avatar"
        alt="Avatar Image"
        onClick={this.props.onClick || (() => {})}
        {...this.props}
        src={imageUri}
        onError={this.handleError}
      />
    )
  }
});
