import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import './App.css';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import MyTodo from './pages/MyTodo';
import LoadingSignup from './pages/LoadingSignup';
import axios from 'axios';
import Mypage from './pages/Mypage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignin: false,
      userinfo: null,
      // groupinfo: null,
      groupinfo: ['group1', 'group2', 'group3'], // 추후 삭제 필요
    };
    this.handleResponseSuccess = this.handleResponseSuccess.bind(this);
  }

  handleResponseSuccess(signinData) {
    axios.get('https://server.kudapach.com/user/info').then((res) => {
      this.setState({
        isSignin: true,
        userinfo: res.data, // id, email, username, mobile
        groupinfo: signinData.groups,
      });
      this.props.history.push('/');
    });
  }

  render() {
    const { isSignin, userinfo, groupinfo } = this.state;

    return (
      <div>
        <Switch>
          <Route
            path="/signin"
            render={() => (
              <Signin handleResponseSuccess={this.handleResponseSuccess} />
            )}
          />
          <Route path="/loadingSignup" render={() => <LoadingSignup />} />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route
            path="/mytodo"
            render={() => <MyTodo userinfo={userinfo} groupinfo={groupinfo} />}
          />
          <Route path="/mypage" render={() => <Mypage />} />
          <Route
            path="/"
            render={() => {
              if (isSignin) {
                return <Redirect to="/mytodo" />;
              }
              return <Redirect to="/signin" />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
