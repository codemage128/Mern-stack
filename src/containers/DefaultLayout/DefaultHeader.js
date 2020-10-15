import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppSidebarToggler } from '@coreui/react';

import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { signout } from '../../actions/user';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  logOut() {
    console.log("LOG OUT");
    this.props.signout();
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <h3 style={{ 'paddingTop': '5px' }} className="ml-3 mr-3">CNS WORK</h3>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto mr-3" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem><i className="fa fa-user"></i> Users</DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects</DropdownItem>
              <DropdownItem onClick={this.logOut.bind(this)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;


export default connect(null, {signout})(DefaultHeader);

