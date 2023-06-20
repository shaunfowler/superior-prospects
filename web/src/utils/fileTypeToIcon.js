import React from "react";
import { Avatar } from "@material-ui/core";
import { red, blue, green, orange } from "@material-ui/core/colors";
import Photo from "@material-ui/icons/Photo";
import Attachment from "@material-ui/icons/Attachment";

const textStyle = {
  fontWeight: 800,
  fontSize: "0.5em",
  textTransform: "uppercase"
};

const fileTypeToIcon = filename => {
  const split = filename.split(".");
  const extension = split[split.length - 1].toLowerCase();
  switch (extension) {
    case "png":
    case "jpg":
    case "jpeg":
      return (
        <Avatar style={{ backgroundColor: orange[200] }}>
          <Photo />
        </Avatar>
      );
    case "xls":
    case "xlsx":
      return (
        <Avatar style={{ backgroundColor: green[300] }}>
          <span style={{ ...textStyle }}>xlsx</span>
        </Avatar>
      );
    case "doc":
    case "docx":
      return (
        <Avatar style={{ backgroundColor: blue[300] }}>
          <span style={textStyle}>docx</span>
        </Avatar>
      );
    case "pdf":
      return (
        <Avatar style={{ backgroundColor: red[300] }}>
          <span style={{ ...textStyle, fontSize: "0.6em" }}>pdf</span>
        </Avatar>
      );
    default:
      return (
        <Avatar>
          <Attachment />
        </Avatar>
      );
  }
};

export default fileTypeToIcon;
