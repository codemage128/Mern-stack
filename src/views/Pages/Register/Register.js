import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { signup } from '../../../actions/user';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
    };
  }

  handleFormSubmit(data) {
    if (data.password == data.password1) {
      this.setState({ message: '' });
      this.props.signup(data);
    } else {
      this.setState({ message: 'Password does not match.' });
    }
  }

  renderAlert(error) {
    let message = this.state.message || this.props.message

    if (message) {
      return (
        <div className="alert alert-warning">
          <strong>Oops!
                </strong> {message}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1 className="text-center">SIGN UP</h1>
                  <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field
                        name="name"
                        type='text'
                        className="form-control"
                        component="input"
                        placeholder="Name"
                        required />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Field
                        name="email"
                        type='text'
                        className="form-control"
                        component="input"
                        placeholder="Email"
                        required />
                    </InputGroup>
                    <InputGroup className="mb-3">
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
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field
                        name="password1"
                        type='password'
                        className="form-control"
                        component="input"
                        placeholder="Password Repeat"
                        required />
                    </InputGroup>
                    {this.renderAlert()}
                    <Button color="success" block type="submit">SIGN UP</Button>
                  </form>
                  <p className="text-muted mt-2">Already have an account? <a href="#/login">SIGN IN</a></p>
                </CardBody>
              </Card>
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

export default connect(mapStateToProps, { signup })(reduxForm({
  form: 'register'
})(Register));