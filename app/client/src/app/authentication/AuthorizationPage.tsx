import React, {Component} from 'react';
import {Button, TextField} from '@material-ui/core';
import {Redirect} from 'react-router'
import {apiAxiosInstance} from "../utils/apiUtils";

import "../styles/Authorization.css"
import {AuthenticatedUser, CurrentUser} from "../utils/CurrentUser";
import {AxiosResponse} from "axios";

interface AuthorizationPageProps {
  currentUser: CurrentUser
  isRegistration: boolean
  onAuthorization(username: string): void
}

class AuthorizationPage extends Component<AuthorizationPageProps> {

  state = {
    username: "",
    password: "",
    passwordConfirm: ""
  }

  private handleClick = () => {
    const self = this;
    const username = this.state.username
    let post: Promise<AxiosResponse>
    if (this.props.isRegistration) {
      post = apiAxiosInstance.post('/registration', this.state)
    }
    else {
      post = apiAxiosInstance.post('/login?username=' + username + "&password=" + this.state.password)
    }
    post.then(function (response) {
        if (response.status === 200) {
          self.props.onAuthorization(username)
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
    if (this.props.currentUser instanceof AuthenticatedUser) {
      return <Redirect to='/'/>;
    }
    return (
      <div className="authorization_page">
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
          {this.props.isRegistration && <br/> }
          {this.props.isRegistration &&
            <TextField
              label="Password confirmation"
              type="password"
              style={{
                width: "25rem"
              }}
              onChange={(event) => this.setState({passwordConfirm: event.target.value})}
            />
          }
          <br/>
          <Button className="authorization_button"
                  style={{
                    margin: "15px"
                  }}
                  variant="contained"
                  color="primary"
                  onClick={this.handleClick}>
            {this.props.isRegistration ? "Register" : "Login"}
          </Button>
        </div>
      </div>
    );
  }
}

export default AuthorizationPage;