import React, { Component } from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import InfoIcon from "@material-ui/icons/Info";
import BusinessIcon from "@material-ui/icons/Business";
import "./About.less";

class About extends Component {
  componentWillMount() {
    document.title = "About - Superior Prospects";
  }

  renderAbout = () => {
    return (
      <div>
        <div className="paper__title">
          <Typography variant="h6">About</Typography>
        </div>
        <div className="content">
          <Typography variant="subtitle1">
            Related Experience and Training (Brian Fowler)
          </Typography>
          <p>
            I have been interested in rocks since the age of seven and have been
            a member of several rock and mineral clubs providing me with
            numerous field trips rock-hounding. During the summer of 1980 I
            worked at the Detour Lake mine for J.S. Redpath. In the fall of
            1980, I attended Carleton University in Ottawa to pursue a Bachelor
            of Science degree, geology major. My return to the work force in
            1981 prevented my continuation of this post secondary education.
          </p>
          <p>
            I moved to Marathon in 1982 to do some prospecting with my
            grandfather Arthur Wright during the Hemlo rush. My grandfather was
            instrumental in my initial interest as a rock collector, having been
            involved in the mining industry all his life.
          </p>
          <p>
            In October 1982, I hired on with David Bell, who was then conducting
            a drill program on the Goliath/Golden Sceptre properties in the
            Hemlo camp. My chief duties involved core splitting and shipping
            rock samples. In November, Noranda Exploration took over the project
            and I was transferred to their payroll. For the next two years I
            performed a number of duties such as core splitting, soil sampling
            and down hole surveying. In February 1985 the exploration boom was
            over, so I took up permanent employment with the David Bell mine,
            now owned and operated by Barrick/Teck-Cominco. I worked at the mine
            for three years as a shipper/receiver. In December 1988, I changed
            employers and began working for Marathon Pulp, the local pulp mill.
            My employment ended when the mill shut down in March 2009 and I
            moved to Pinawa, Manitoba, where I currently work for Atomic Energy
            of Canada.
          </p>
          <p>
            During the period from 1982-2009, I have actively explored the
            Schreiber-Hemlo greenstone belt searching for both precious and base
            metals. During the summer months a Thunder Bay District Ministry
            geologist would visit the MNDM's satellite office in Marathon. I
            would take that opportunity to visit them with samples I'd collected
            and listen to their advice. Over the years, I have attended
            prospecting courses and participated in the Prospectors Tent at the
            annual Mining Symposium in Thunder Bay. I have visited and gone
            underground at all three Hemlo gold mines, the Geco base metal mine
            and the Winston Lake base metal mine.
          </p>
          <p>
            I have gathered a good sound knowledge of mining exploration and
            gained invaluable advice from numerous Company and Ministry
            geologists. Having spent the majority of my time in the
            Schreiber-Hemlo belt, I am very familiar with the geology and
            showings from White River in the east, to Schreiber in the west and
            Manitouwadge in the north. I use this to my advantage to acquire
            properties in the belt with good potential for both base metal and
            precious metal discoveries.
          </p>
        </div>
      </div>
    );
  };

  renderContactInfo = () => {
    return (
      <div>
        <div className="paper__title">
          <Typography variant="h6">Contact</Typography>
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
      </div>
    );
  };

  render() {
    return (
      <div className="aboutView container">
        <Grid container spacing={8}>
          <Grid item xl={8} lg={8} md={7} sm={7} xs={12}>
            <Paper className="paper" elevation={1}>
              {this.renderAbout()}
            </Paper>
          </Grid>
          <Grid item xl={4} lg={4} md={5} sm={5} xs={12}>
            <Paper className="paper" elevation={1}>
              {this.renderContactInfo()}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default About;
