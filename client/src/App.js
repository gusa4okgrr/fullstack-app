import React, { Component, Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import Button from '@material-ui/core/Button';
import './App.scss';

const TextFieldAdapter = ({ input, meta, ...rest }) => (
  <TextField
    {...input}
    {...rest}
    onChange={(event, value) => input.onChange(value)}
    errorText={meta.touched ? meta.error : ''}
  />
)

class App extends Component {
  state = {
    showResult: false,
    compareResult: false,
  };

  handleSubmit = async (data) => {
    const response = await fetch('api/compareFiles', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    });
    const body = await response.json();
    this.setState({
      showResult: true,
      compareResult: body.data.success,
    });
  }

  render() {
    const {
      showResult,
      compareResult
    } = this.state;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Fragment>
          <Form
            onSubmit={this.handleSubmit}
            render={({ handleSubmit, pristine, invalid }) => (
              <form className="form" onSubmit={handleSubmit}>
                <div className="header">Form</div>
                <Field
                  name="access"
                  component={TextFieldAdapter}
                  hintText="Access Purpose"
                  floatingLabelText="Access Purpose"
                />
                <Field
                  name="applicationName"
                  component={TextFieldAdapter}
                  hintText="Application Name"
                  floatingLabelText="Application Name"
                />
                <div className="header">Source</div>
                <Field
                  name="hostname"
                  component={TextFieldAdapter}
                  hintText="Hostname/Group/IP Address/Network"
                  floatingLabelText="Hostname/Group/IP Address/Network"
                />
                <div className="header">Destination</div>              
                <div className="destination">
                  <Field
                    name="destination.hostname"
                    component={TextFieldAdapter}
                    hintText="Hostname/Group/IP Address/Network"
                    floatingLabelText="Hostname/Group/IP Address/Network"
                  />
                  <Field
                    name="destination.networkProtocol"
                    component={TextFieldAdapter}
                    hintText="Network Protocol"
                    floatingLabelText="Network Protocol"
                  />
                  <Field
                    name="destination.portNumbers"
                    component={TextFieldAdapter}
                    hintText="Port Numbers"
                    floatingLabelText="Port Numbers"
                  />
                  <Field
                    name="destination.applicationService"
                    component={TextFieldAdapter}
                    hintText="Application Service"
                    floatingLabelText="Application Service"
                  />
                </div>
                <Field
                  name="comments"
                  component={TextFieldAdapter}
                  hintText="Comments"
                  floatingLabelText="Comments"
                />
                
                <Button
                  variant="contained"
                  type="submit"
                  className="submit"
                  disabled={pristine || invalid}
                  color="primary"
                >
                  Submit
                </Button>
              </form>
            )}
          />
          { showResult && (
            <strong>Result is {`${compareResult ? 'SUCCESS' : 'FAIL'}`}</strong>
          ) }
        </Fragment>
      </MuiThemeProvider>
    )
  }
}

export default App;
