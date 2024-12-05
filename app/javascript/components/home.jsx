import React from "react";
import { merge } from "lodash";
import ExternalHeader from "./external_header";
import LoginForm from "./session/login_form";

class Home extends React.Component {

    render() {
        return (
            <div>
                <ExternalHeader/>
                <div className="main_page">
                    <h1 className="fancy_header">Event Buddies</h1>
                    <h2>Upgrade Your Friendships</h2>
                </div>
                <LoginForm/>
            </div>
        );
    }
}

export default Home;
