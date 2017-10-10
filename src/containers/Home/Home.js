import React, { Component } from "react";
import PropertyItem from "../../components/PropertyItem";
import UpdateItem from "../../components/UpdateItem";
import AddUpdateForm from "../../components/AddUpdateForm";

class Home extends Component {
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
        <div>
          <PropertyItem />
          <PropertyItem />
          <PropertyItem />
        </div>
      </div>
    );
  }
}

export default Home;
