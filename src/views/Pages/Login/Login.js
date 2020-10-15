import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, NavLink } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { signin } from '../../../actions/user';

class Login extends Component {
  renderAlert() {
    if (this.props.message) {
      return (
        <div className="alert alert-warning">
          <strong>Oops! </strong>{this.props.message}
        </div>
      )
    }
  }
  
  handleFormSubmit(d) {
    this.props.signin(d);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>SIGN IN</h1>
                    <p className="text-muted">Hello! Sign In to CNS Work</p>
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          name="email"
                          type='text'
                          className="form-control"
                          component="input"
                          placeholder="Email"
                          required />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          name="password"
                          type='password'
                          className="form-control"
                          component="input"
                          placeholder="Password"
                          required />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" type="submit">Login</Button>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>SIGN UP</h2>
                      <p>Welcome To CNS Work. Please feel free to sign up for CNS Work.</p>
                      <NavLink href="#/register">
                        <Button color="primary" className="mt-3" active>Register Now!</Button>
                      </NavLink>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    message: auth.message
  }
}

export default connect(mapStateToProps, { signin })(reduxForm({
  form: 'login'
})(Login));
