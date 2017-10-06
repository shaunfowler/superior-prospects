import React, { Component } from "react";
import { connect } from "react-redux";
import { getUpdates, deleteUpdate } from "../../actions/updatesActions";
import UpdateItem from "../../components/UpdateItem";

class Home extends Component {
  componentWillMount() {
    this.props.getUpdates();
  }

  onUpdateDelete = id => {
    this.props.deleteUpdate(id);
  };

  render() {
    const updates = this.props.updates.list;
    return (
      <div>
        Home
        <div>
          {updates &&
            updates.map(u => (
              <UpdateItem
                key={u.id}
                id={u.id}
                text={u.text}
                date={u.date}
                onDelete={this.onUpdateDelete}
              />
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
    getUpdates: () => dispatch(getUpdates()),
    deleteUpdate: id => dispatch(deleteUpdate(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
