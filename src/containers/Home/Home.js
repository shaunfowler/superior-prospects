import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getUpdates,
  deleteUpdate,
  addUpdate
} from "../../actions/updatesActions";
import UpdateItem from "../../components/UpdateItem";
import AddUpdateForm from "../../components/AddUpdateForm";

export class Home extends Component {
  componentWillMount() {
    this.props.getUpdates();
  }

  onDeleteUpdate = id => {
    this.props.deleteUpdate(id);
  };

  onAddUpdate = update => {
    this.props.addUpdate(update);
  };

  render() {
    const updates = this.props.updates.list;
    return (
      <div>
        Home
        <div>
          <AddUpdateForm onAdd={this.onAddUpdate} />
          {updates &&
            updates.map(u => (
              <UpdateItem
                key={u.id}
                id={u.id}
                text={u.text}
                date={u.date}
                onDelete={this.onDeleteUpdate}
              />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { updates: state.updates };
};

const mapDispatchToProps = dispatch => {
  return {
    getUpdates: () => dispatch(getUpdates()),
    deleteUpdate: id => dispatch(deleteUpdate(id)),
    addUpdate: update => dispatch(addUpdate(update))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
