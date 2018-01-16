import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropertyItem from "../../components/PropertyItem";
import UpdateItem from "../../components/UpdateItem";
import AddUpdateForm from "../../components/AddUpdateForm";

class Home extends Component {
  componentWillMount() {
    this.props.queryUpdates();
    this.props.queryProperties();
  }

  onDeleteUpdate = update => {
    this.props.deleteUpdate(update);
  };

  onCreateUpdate = update => {
    this.props.createUpdate(update);
  };

  render() {
    const updates = this.props.updates.list;
    const properties = this.props.properties.list;
    const { isAuthenticated } = this.props;
    return (
      <div className="homeView container ">
        <div className="columns">
          <div className="column">
            <h1 className="title">Updates</h1>
            {isAuthenticated && (
              <AddUpdateForm onCreate={this.onCreateUpdate} />
            )}
            {updates &&
              updates.map(u => (
                <UpdateItem
                  key={u._id}
                  id={u._id}
                  body={u.body}
                  created={u.created}
                  onDelete={this.onDeleteUpdate}
                  isUserAuthenticated={isAuthenticated}
                />
              ))}
          </div>
          <div className="column">
            <h1 className="title">Recently added properties</h1>
            {properties &&
              properties.map(p => (
                <PropertyItem
                  key={p._id}
                  name={p.name}
                  safeName={p.safeName}
                  description={p.description}
                />
              ))}
            <br />
            <Link to="/properties" className="button is-link">
              View all properties
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
