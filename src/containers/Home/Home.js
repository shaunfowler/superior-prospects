import React, { Component } from "react";
import PropertyItem from "../../components/PropertyItem";
import UpdateItem from "../../components/UpdateItem";
import AddUpdateForm from "../../components/AddUpdateForm";

class Home extends Component {
  componentWillMount() {
    this.props.getUpdates();
    this.props.getProperties();
  }

  onDeleteUpdate = id => {
    this.props.deleteUpdate(id);
  };

  onAddUpdate = update => {
    this.props.addUpdate(update);
  };

  render() {
    const updates = this.props.updates.list;
    const properties = this.props.properties.list;
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
                body={u.body}
                created={u.created}
                onDelete={this.onDeleteUpdate}
              />
            ))}
        </div>
        <div>
          {properties &&
            properties.map(p => (
              <PropertyItem
                key={p._id}
                name={p.name}
                safeName={p.safeName}
                description={p.description}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Home;
