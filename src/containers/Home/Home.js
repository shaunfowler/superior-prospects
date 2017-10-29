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
      <div className="home">
        <div className="updatesList">
          <AddUpdateForm onAdd={this.onAddUpdate} />
          <h2>Updates</h2>
          {updates &&
            updates.map(u => (
              <UpdateItem
                key={u._id}
                id={u._id}
                body={u.body}
                created={u.created}
                onDelete={this.onDeleteUpdate}
              />
            ))}
        </div>
        <div className="propertiesList">
          <h2>Recently added properties</h2>
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
