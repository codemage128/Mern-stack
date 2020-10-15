import React, { Component } from 'react';
import { Card, CardBody, Row, Col, CardHeader, Table, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { alluser, deluser, updateuser } from '../../../actions/user';

class User extends Component {
  constructor() {
    super();
    this.state = {
      edit: false
    }
  }

  componentWillMount() {
    this.props.alluser();
  }

  editUser(u) {
    this.setState({ edit: true });
    this.props.initialize(u);
  }

  deleteUser(u) {
    this.props.deluser(u);
  }

  handleSubmit(u) {
    this.props.updateuser(u);
  }

  render() {
    const { handleSubmit, dirty } = this.props;
    const editForm = this.state.edit ? (
      <Col sm="12" xl="5">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>USER EDIT</strong>
          </CardHeader>
          <CardBody>
            <Form className="was-validated" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Field
                  id="name"
                  name="name"
                  type='text'
                  className="form-control"
                  component="input"
                  placeholder="Name"
                  required />
                {dirty ? <FormFeedback className="help-block">Please input valid name.</FormFeedback> : ''}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Field
                  id="email"
                  name="email"
                  type='email'
                  className="form-control"
                  component="input"
                  placeholder="Email"
                  required />
                {dirty ? <FormFeedback className="help-block">Please input valid email.</FormFeedback> : ''}
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label>Gender</Label>
                </Col>
                <Col md="9">
                  <FormGroup check inline>
                    <Field
                      id="man"
                      name="sex"
                      type='radio'
                      className="form-check-input"
                      component="input"
                      value="m"
                      required />
                    <Label className="form-check-label" check htmlFor="man">Man</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Field
                      id="woman"
                      name="sex"
                      type='radio'
                      className="form-check-input"
                      component="input"
                      value="w"
                      required />
                    <Label className="form-check-label" check htmlFor="woman">Woman</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="birth">Birth</Label>
                <Field
                  id="birth"
                  name="birth"
                  type='date'
                  className="form-control"
                  component="input"
                  required />
                {dirty ? <FormFeedback className="help-block">Please input valid birth date.</FormFeedback> : ''}
              </FormGroup>
              <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Save</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    ) : '';

    return (
      <div className="animated fadeIn mt-3">
        <Row>
          <Col sm="12" xl="7">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>USER LIST</strong>
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th className="text-center">NO</th>
                      <th className="text-center">NAME</th>
                      <th className="text-center">SEX</th>
                      <th className="text-center">EMAIL</th>
                      <th className="text-center">BIRTH</th>
                      <th className="text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.users.map((u, index) => {
                        return (
                          <tr key={u.id}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{u.name}</td>
                            <td className="text-center">{u.sex == "m" ? "MAN" : "WOMAN"}</td>
                            <td className="text-center">{u.email}</td>
                            <td className="text-center">{u.birth.toString()}</td>
                            <td className="text-center">
                              <Button className="btn-brand icon bg-primary mr-1" onClick={this.editUser.bind(this, u)}><i className="fa fa-edit"></i></Button>
                              <Button className="btn-brand icon bg-warning" onClick={this.deleteUser.bind(this, u)}><i className="fa fa-trash"></i></Button>
                            </td>
                          </tr>
                        )
                      }
                      )
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          {editForm}
        </Row>
      </div>
    );
  }
}


function mapStateToProps({ user }) {
  return {
    users: user.users
  }
}

export default connect(mapStateToProps, { alluser, deluser, updateuser })(reduxForm({
  form: 'user'
})(User));

