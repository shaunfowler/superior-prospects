import React, { Component } from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "material-ui";
import {
  Person as PersonIcon,
  Info as InfoIcon,
  Business as BusinessIcon
} from "material-ui-icons";
import "./Contact.less";

class Contact extends Component {
  componentWillMount() {
    document.title = "Contact - Superior Prospects";
  }

  render() {
    return (
      <div className="contactView container">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className="paper" elevation={1}>
              <div className="paper__title">
                <Typography variant="title">Contact</Typography>
              </div>
              <div className="content">
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <div>
                          Brian Fowler, President
                          <br />
                          +1 (204) 753-8201
                          <br />
                          bfowler@superiorprospects.com
                        </div>
                      }
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <div>
                          P.O. Box 954
                          <br />
                          Pinawa, Manitoba, R0E 1L0
                        </div>
                      }
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <div>
                          INC: 1997, ON chart. Private co.
                          <br />
                          Auditors: Ernst &amp; Young
                          <br />
                          Subsidiaries: Wholly owned 1188785 Ontario Ltd.
                        </div>
                      }
                    />
                  </ListItem>
                </List>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Contact;
