import { Component } from "react";

class BackDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="backdrop" style={{ zIndex: this.props.zIndex }}></div>
    );
  }
}

BackDrop.defaultProps = {
  zIndex: 0,
};
export default BackDrop;
