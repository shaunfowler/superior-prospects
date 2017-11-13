import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import {
  getPropertyBody,
  getPropertyMedia
} from '../../redux/models/properties';

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      body: [],
      media: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    Promise.all([
      this.props.getProperties(),
      getPropertyBody(id),
      getPropertyMedia(id)
    ]).then(([properties, body, media]) => {
      this.setState({
        initialized: true,
        body: body.data,
        media: media.data
      });
    });
  }

  render() {
    if (!this.state.initialized) {
      return null;
    }

    const { id } = this.props.match.params;
    const property = this.props.properties.list.find(p => p._id === id);
    const { body, media } = this.state;
    return (
      <div className="propertyView">
        <h2>{property.name}</h2>
        <em>{property.description}</em>
        <ul>{media.map(m => <li key={m._id}>{m.fileName}</li>)}</ul>
        <div>{body && renderHTML(body)}</div>
      </div>
    );
  }
}

export default Property;
