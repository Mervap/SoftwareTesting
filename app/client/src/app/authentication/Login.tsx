import React, {Component} from 'react';
import {Button, TextField} from '@material-ui/core';
import {Redirect} from 'react-router'
import {apiAxiosInstance} from "../utils/apiUtils";

import "../styles/Login.css"

interface LoginPageProps {
  username: string | null
  onLogin(username: string): void
}

class Login extends Component<LoginPageProps> {

  state = {
    username: "",
    password: "",
    redirect: false
  }

  private handleClick = () => {
    const self = this;
    const username = this.state.username
    apiAxiosInstance.post('/login?username=' + username + "&password=" + this.state.password)
      .then(function (response) {
        if (response.status === 200) {
          self.props.onLogin(username)
          self.setState({redirect: true})
        } else {
          console.error(response);
          alert("Unexpected Error")
        }
      })
      .catch(function (error) {
        if (error.response !== undefined && error.response.data.status === 401) {
          alert("Check credentials")
        } else {
          console.error(error);
        }
      });
  }

  render() {
    if (this.props.username !== null || this.state.redirect) {
      return <Redirect to='/'/>;
    }
    return (
      <div className="login_page">
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
          <Button className="submit_button"
                  style={{
                    margin: "15px"
                  }}
                  variant="contained"
                  color="primary"
                  onClick={this.handleClick}>
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;