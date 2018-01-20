import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropertyItem from "../../components/PropertyItem";
import UpdateItem from "../../components/UpdateItem";
import AddUpdateForm from "../../components/AddUpdateForm";

const sortNewestToOldestPredicate = (a, b) =>
  new Date(b.created) - new Date(a.created);

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
      <div className="homeView ">
        <div className="container">
          <div className="columns viewContainer">
            <div className="column">
              <h1 className="title">News</h1>
              {isAuthenticated && (
                <AddUpdateForm onCreate={this.onCreateUpdate} />
              )}
              {updates &&
                updates
                  .sort(sortNewestToOldestPredicate)
                  .map(u => (
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
                properties
                  .sort(sortNewestToOldestPredicate)
                  .map(p => (
                    <PropertyItem
                      key={p._id}
                      id={p._id}
                      name={p.name}
                      created={p.created}
                      safeName={p.safeName}
                      description={p.description}
                    />
                  ))}
              <br />
              <Link to="/properties" className="button is-link">
                View all properties{" "}
                <i
                  className="fa fa-lg fa-angle-right"
                  style={{ marginLeft: "10px" }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
