import React, {Component} from 'react';
import {Button, TextField} from '@material-ui/core';
import {Redirect} from 'react-router'
import {apiAxiosInstance} from "../utils/apiUtils";
import Alert from '@material-ui/lab/Alert';

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
    passwordConfirm: "",
    errorText: ""
  }

  private handleClick = () => {
    const self = this;
    const username = this.state.username
    let post: Promise<AxiosResponse>
    if (this.props.isRegistration) {
      const user = {
        username: username,
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm,
      }
      post = apiAxiosInstance.post('/registration', user)
    }
    else {
      post = apiAxiosInstance.post('/login?username=' + username + "&password=" + this.state.password)
    }
    const onError = (response: any) => {
      const data = response !== undefined ? response.data : undefined
      const message = data !== undefined ? data.message : undefined
      const errorText = message !== undefined && message.length > 0 ? message : "Unexpected server error"
      console.error(data, message, errorText);
      self.setState({ errorText: errorText })
    }
    post.then(function (response) {
        if (response.status === 200) {
          self.setState({ errorText: "" })
          self.props.onAuthorization(username)
        } else {
          onError(response)
        }
      })
      .catch(function (error) {
        onError(error.response)
      });
  }

  render() {
    if (this.props.currentUser instanceof AuthenticatedUser) {
      return <Redirect to='/'/>;
    }
    return (
      <div className="authorization_page">
        <div>
          {this.state.errorText.length > 0 &&
          <Alert severity="error">
            {this.state.errorText}
          </Alert>}
          {/*<br/>*/}
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