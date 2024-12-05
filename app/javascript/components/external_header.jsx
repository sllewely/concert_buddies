import React from "react";
import { Link } from "react-router-dom";

const ExternalHeader = props => {
    return (
        <div className="external_header">
            <header className="V_Flex header">
                <div className="H_Flex_header">
                    <div className="header__left">
                        <Link to="/" className="header__left">
                            <i className="material-icons md-48 md-blue">event_seat</i>
                            <h2 className="header__title fancy_header">Event Buddies</h2>
                        </Link>
                    </div>
                    <div className="header__right">
                        <Link to="/about">
                            <span>About</span>
                        </Link>
                        <Link to="/team">
                            <span>Meet the Team</span>
                        </Link>
                    </div>
                </div>
                <div className="border_line" />
            </header>
        </div>
    );
};

export default ExternalHeader;
