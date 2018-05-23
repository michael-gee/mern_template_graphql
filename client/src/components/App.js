import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Header from './Header';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import NotFound from './Pages/NotFound';
import TokenConfig from './Pages/TokenConfig';
import UserProfile from './Pages/UserProfile';

const styles = {
  '@global': {
    body: {
      margin: 0,
      padding: 0,
      fontSize: '62.5%',
      fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
    },

    p: {
      fontSize: '1.6em',
    }
  }
};

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Router>
        <div>
          <Header />

          <Switch>
            <Route exact path="/" component={Home} />

            <Route path="/sign-in" component={Auth} />
            <Route path="/user-profile" component={UserProfile} />

            <Route path="/token" component={TokenConfig} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router> 
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
