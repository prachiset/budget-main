import React from "react";
import { Redirect } from 'react-router-dom';
import logo from './images/eMoney.png';


class Login extends React.Component {
    constructor() {
        super();

        this.state = {
          username: '',
          password: '',
          isLoggedIn: false
        };

        this.handleUsernameChanged = this.handleUsernameChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChanged(e) {
        this.setState({
              username: e.target.value,
            });
    }

    handlePasswordChanged(e) {
        this.setState({
              password: e.target.value,
            });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
              isLoggedIn: true,
            });
    }

  render() {
        if(this.state.isLoggedIn === true) {
            return (<Redirect to="/dashboard" />);
        }
        else {
                return (
                    <form onSubmit={this.handleSubmit}>
                      <div className="imgcontainer">
                        <img alt="eMoney" src={logo} />
                      </div>

                      <div className="container">
                        <label><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" data-test="username" value={this.state.username} onChange={this.handleUsernameChanged} required></input>

                        <label><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" data-test="password" value={this.state.password} onChange={this.handlePasswordChanged} required></input>

                        <button type="submit">Login</button>
                      </div>
                    </form>
                );
        }
  }
}

export default Login;