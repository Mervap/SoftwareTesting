import React, {Component} from 'react';
import {Button, TextField} from '@material-ui/core';
import {Redirect} from 'react-router'
import {apiAxiosInstance} from "../utils/apiUtils";

import "../styles/Register.css"

interface RegisterPageProps {
  username: string | null
  onRegister(username: string): void
}

class Register extends Component<RegisterPageProps> {

  state = {
    username: "",
    password: "",
    passwordConfirm: "",
    redirect: false
  }

  private handleClick = () => {
    const self = this;
    const username = this.state.username
    const user = {
      username: username,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };
    apiAxiosInstance.post('/registration', user)
      .then(function (response) {
        if (response.status === 200) {
          self.props.onRegister(username)
          self.setState({redirect: true})
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    if (this.props.username !== null || this.state.redirect) {
      return <Redirect to='/'/>;
    }
    return (
      <div className="register_page">
        <div>
          <TextField
            label="Username"
            style={{
              width: "25rem"
            }}
            onChange={(event) => this.setState({username: event.target.value})}
          />
          <br/>
          <TextField
            label="Password"
            type="password"
            style={{
              width: "25rem"
            }}
            onChange={(event) => this.setState({password: event.target.value})}
          />
          <br/>
          <TextField
            label="Password confirmation"
            type="password"
            style={{
              width: "25rem"
            }}
            onChange={(event) => this.setState({passwordConfirm: event.target.value})}
          />
          <br/>
          <Button className="register_button"
                  style={{
                    margin: "15px"
                  }}
                  variant="contained"
                  color="primary"
                  onClick={this.handleClick}>
            Register
          </Button>
        </div>
      </div>
    );
  }
}

export default Register;