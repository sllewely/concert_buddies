import React from "react";
import { merge } from "lodash";
import { login } from "../../actions/session_actions";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      utf8: "✓",
      authenticity_token: window.token,
      user: {
        email: "harry.appler@gmail.com",
        password: "starwars",
        remember_me: "0"
      },
      commit: "Log in"
    };
  }

  update(type) {
    return e => this.setState({ [type]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props
      .login(user)
      .then(
        () => this.props.history.push(`/`),
        () => this.setState({ password: "" })
      );
  }

  render() {
    return (
      <div className="auth-form-container">
        <h1 className="auth-form-title">Concert Buddies</h1>
        <form className="auth-form" onSubmit={e => this.handleSubmit(e)}>
          <h2>Log In</h2>
          <input
            className="auth-field"
            type="text"
            onChange={this.update("email")}
            placeholder="Username"
            value={this.state.email}
          />
          <input
            className="auth-field"
            type="password"
            onChange={this.update("password")}
            placeholder="Password"
            value={this.state.password}
          />

          <input className="auth-submit" type="submit" value="Log In" />
        </form>
        <Link to="/signup" className="auth-swap">
          Create Account
        </Link>
      </div>
    );
  }
}

const mdp = dispatch => {
  return {
    login: user => dispatch(login(user))
  };
};

export default connect(
  null,
  mdp
)(LoginForm);
