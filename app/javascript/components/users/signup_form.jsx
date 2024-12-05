import React from "react";
import { merge } from "lodash";
import { signup } from "../../actions/session_actions";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import ExternalHeader from "../external_header";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendInvite: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordMatch: "",
      errors: null
    };
  }

  update(type) {
    return e => this.setState({ [type]: e.currentTarget.value });
  }

  clearPasswordMismatchError() {
    return e => this.setState({ errors: null });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password === this.state.passwordMatch) {
      const user = {
        user: {
          // friendInvite: this.state.friendInvite,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        }
      };
      this.props
        .signup(user)
        .then(
          () => this.props.history.push(`/`),
          () => this.setState({ password: "", passwordMatch: "" })
        );
    } else {
      this.setState({
        password: "",
        passwordMatch: "",
        errors: "Your passwords did not match"
      });
    }
  }

  render() {
    const errors = this.state.errors ? <h3>{this.state.errors}</h3> : null;
    return (
      <div>
        <ExternalHeader/>
        <div class="main_page">
          <h2>
            Concert Buddies is in Beta. An invite code is required.
          </h2>
        </div>
        <div className="auth-form-container">
          <form className="auth-form" onSubmit={e => this.handleSubmit(e)}>
            <h2 className="header">Create An Account</h2>
            {this.props.errors.map((error, idx) => (
              <li className="auth-form-error" key={idx}>
                {error}
              </li>
            ))}
            {errors}
            <input
              className="auth-field"
              type="text"
              onChange={this.update("friendInvite")}
              placeholder="Friend Code"
              value={this.state.friendInvite}
            />
            <input
              className="auth-field"
              type="text"
              onChange={this.update("firstName")}
              placeholder="First Name"
              value={this.state.firstName}
            />
            <input
              className="auth-field"
              type="text"
              onChange={this.update("lastName")}
              placeholder="Last Name"
              value={this.state.lastName}
            />
            <input
              className="auth-field"
              type="text"
              onChange={this.update("email")}
              placeholder="Email"
              value={this.state.email}
            />
            <input
              className="auth-field"
              type="password"
              onChange={this.update("password")}
              onBlur={this.clearPasswordMismatchError()}
              placeholder="Password"
              value={this.state.password}
            />
            <input
              className="auth-field"
              type="password"
              onChange={this.update("passwordMatch")}
              placeholder="Confirm Password"
              value={this.state.passwordMatch}
            />

            <input className="auth-submit" type="submit" value="Create Account" />
          </form>
          <Link to="/login" className="auth-swap">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    );
  }
}

const msp = state => {
  return {
    errors: state.errors.session
  };
};

const mdp = dispatch => {
  return {
    signup: user => dispatch(signup(user))
  };
};

export default withRouter(
  connect(
    msp,
    mdp
  )(SignupForm)
);
