import React, { Component } from "react";
import Joi from "joi-browser";

class Login extends Component {
  state = { username: "", password: "", errors: {} };
  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };
  // passowrd = React.createRef();
  // componentDidMount() {
  //   this.passowrd.current.focus();
  // }
  validate = () => {
    const errors = {};
    //Clone State
    const state = { ...this.state };
    delete state.errors;
    const res = Joi.validate(state, this.schema, { abortEarly: false });
    if (res.error === null) {
      this.setState({ errors: {} });
      return null;
    }
    for (const error of res.error.details) {
      errors[error.path] = error.message;
    }

    console.log("Joi validate", res);

    //Set State
    this.setState({ errors });
    return errors;
  };
  handleSubmit = (e) => {
    //todo
    e.preventDefault();
    const errors = this.validate();
    if (errors) return;
    console.log("Submitted");
    this.setState({ username: "", password: "" });
  };
  handleChange = (e) => {
    // clone
    let state = this.state;
    // edit
    state[e.currentTarget.name] = e.currentTarget.value;
    // setState
    this.setState(state);
  };
  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.handleChange}
              autoFocus
            />

            {this.state.errors.username && (
              <div className="alert alert-danger">
                {this.state.errors.username}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>{" "}
            <input
              name="password"
              id="password"
              type="text"
              className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
              // ref={this.passowrd}
            />
            {this.state.errors.password && (
              <div className="alert alert-danger">
                {this.state.errors.password}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
