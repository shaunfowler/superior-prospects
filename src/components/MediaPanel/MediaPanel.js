import React from "react";
import moment from "moment";
import Dropzone from "react-dropzone";
import fileTypeToIcon from "../../utils/fileTypeToIcon";
import { Avatar } from "material-ui";
import { FileUpload as FileUploadIcon } from "material-ui-icons";

const stripFileExtension = filename =>
  filename.substring(0, filename.lastIndexOf("."));

const formatMediaDate = date => moment(date).format("MMMM Do YYYY");

class MediaPanel extends React.Component {
  renderDropZone = () => {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return null;
    }

    return (
      <div className="media__item">
        <div className="media__item__avatar">
          <Avatar>
            <FileUploadIcon />
          </Avatar>
        </div>
        <div className="media__item__text">
          <Dropzone onDrop={this.onFileDrop} className="dropzone" multiple>
            <div className="name">Upload new items</div>
            <div className="date">
              <code>xlsx</code>, <code>docx</code>, <code>pdf</code>,{" "}
              <code>png</code>, <code>jpeg</code>
            </div>
          </Dropzone>
        </div>
      </div>
    );
  };

  renderMedia = () => {
    const { media } = this.props;
    if (!media) {
      return null;
    }

    return (
      <div>
        {media.map(m => (
          <a href={`/api/static/${m.fileName}`} target="_blank" key={m._id}>
            <div className="media__item">
              <div className="media__item__avatar">
                {fileTypeToIcon(m.fileName)}
              </div>
              <div className="media__item__text">
                <div className="name">{stripFileExtension(m.fileName)}</div>
                <div className="date">{formatMediaDate(m.created)}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    );
  };

  render() {
    return (
      <div className="media">
        {this.renderDropZone()}
        {this.renderMedia()}
      </div>
    );
  }
}

MediaPanel.defaultProps = {
  media: []
};

export default MediaPanel;
