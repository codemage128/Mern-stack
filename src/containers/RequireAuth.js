import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.isLogin) {
        this.context.router.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isLogin) {
        this.context.router.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps({auth}) {
    return { isLogin: auth.isLogin };
  }
  Authentication.contextTypes = {
    router: PropTypes.object
  }

  return connect(mapStateToProps)(Authentication);
}