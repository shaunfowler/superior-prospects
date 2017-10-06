import React, { Component } from "react";
import { connect } from "react-redux";
import { getUpdates } from "../../actions/updatesActions";
import UpdateItem from "../../components/UpdateItem/UpdateItem";

class Home extends Component {
  componentWillMount() {
    this.props.getUpdates();
  }

  render() {
    const updates = this.props.updates.list;
    return (
      <div>
        Home
        <div>
          {updates &&
            updates.map(u => (
              <UpdateItem key={u.id} id={u.id} text={u.text} date={u.date} />
            ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { updates: state.updates };
}

function mapDispatchToProps(dispatch) {
  return {
    getUpdates: () => dispatch(getUpdates())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
