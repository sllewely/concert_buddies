import React from "react";
import { Link } from "react-router-dom";
import UserAttendance from "../users/user_attendance";
import { connect } from "react-redux";
import * as moment from "moment";

class EventItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  truncate(text) {
    if (!this.state.expanded) {
      if (text.length > 15) {
        return text.substring(0, 12) + "...";
      } else {
        return text;
      }
    } else {
      return text;
    }
  }

  toggleExpandedInfo() {
    return e =>
      this.setState(prevState => ({
        expanded: !prevState.expanded
      }));
  }

  render() {
    const { event, attendingUsers } = this.props;
    const visibility = this.state.expanded
      ? "event__item_expanded"
      : "event__item_hidden";
    const attendingBubbles = attendingUsers.map(user => (
      <UserAttendance user={user} attendance="attending" key={user.id} />
    ));
    return (
      <article className="event__item V_Flex">
        <section className="H_Flex">
          <div className="V_Flex">
            <div className="H_Flex">
              <h1 className="header_text" onClick={this.toggleExpandedInfo()}>
                {event.name}
              </h1>
              <span
                className="event__item_spacer"
                onClick={this.toggleExpandedInfo()}
              >
                @
              </span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  event.location
                )}`}
                className="header_text event__item_link"
                target="_blank"
              >
                {this.truncate(event.location)}
              </a>
            </div>
            <a
              href={event.event_link}
              target="_blank"
              className={`default_text event__item_link ${visibility}`}
            >
              Buy Tickets here
            </a>
          </div>
          <div className="V_Flex">
            <div className="H_Flex">
              <h1 className="default_text">
                {event.date_time.format("h:mm A")}
              </h1>
              <i
                className="material-icons md-36 md-dark event__item_toggle"
                onClick={this.toggleExpandedInfo()}
              >
                {this.state.expanded ? "expand_less" : "expand_more"}
              </i>
            </div>
          </div>
        </section>
        <div className="V_Flex">
          <p className={`default_text ${visibility}`}>{event.description}</p>
          <div className={`H_Flex attending__bubbles__container ${visibility}`}>
            {attendingBubbles}
          </div>
        </div>
      </article>
    );
  }
}

const msp = (state, ownProps) => {
  const attendingUsers = ownProps.event.attending
    ? ownProps.event.attending.map(userId => state.entities.users[userId])
    : [];
  return {
    attendingUsers
  };
};

export default connect(
  msp,
  null
)(EventItem);
