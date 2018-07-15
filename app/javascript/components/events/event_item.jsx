import React from "react";
import { Link } from "react-router-dom";

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

  toGoogleMaps(address) {}

  toggleExpandedInfo() {
    return e =>
      this.setState(prevState => ({
        expanded: !prevState.expanded
      }));
  }

  render() {
    const { event } = this.props;
    const visibility = this.state.expanded
      ? "event__item_expanded V_Flex"
      : "event__item_hidden";
    return (
      <article className="event__item V_Flex">
        <div className="H_Flex">
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
              className="header_text"
              target="_blank"
            >
              {this.truncate(event.location)}
            </a>
          </div>
          <div className="H_Flex">
            <h1 className="default_text">{event.date}</h1>
            <i
              className="material-icons md-36 md-dark event__item_toggle"
              onClick={this.toggleExpandedInfo()}
            >
              {this.state.expanded ? "expand_less" : "expand_more"}
            </i>
          </div>
        </div>
        <section className={visibility}>
          <div className="H_Flex">
            <a href={event.tickets} target="_blank" className="default_text">
              Buy Tickets here
            </a>
            <h1 className="default_text">{event.time}</h1>
          </div>
          <p className="default_text">{event.description}</p>
        </section>
      </article>
    );
  }
}

export default EventItem;
