import { useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';

const SubmissionForm = (props) => {
  const {
    submission_url,
    setPostRequestDetails,
  } = props;
  const initialValues = {
    name: '',
    email: '',
    publicNoticeText: ''
  };
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState(initialValues);

  const isNameContainingAtleastTwoStrings = (name) => name.trim().replace(/\s+/g, " ").split(' ').length > 1

  const validate = () => {
    let temp = { ...errors };
    temp.name = isNameContainingAtleastTwoStrings(formValues.name) ? "" : "Name should contain at least two strings representing your first and last name.";
    temp.email = (/$^|.+@.+..+/).test(formValues.email) ? "" : "Email should include the @ symbol and domain name.";
    setErrors({
      ...temp
    });

    return Object.values(temp).every(x => x == "")
  }

  const resetForm = () => {
    setFormValues(initialValues);
    setErrors({});
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        customer_name: formValues.name,
        customer_email: formValues.email,
        text_body: formValues.publicNoticeText
      };

      const response = await fetch(submission_url, {
        method: 'POST',
        body: JSON.stringify(data),
        header: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.status !== 'error') {
        resetForm();
      }
      setPostRequestDetails(result);
      // Make the alert disappear after 4 seconds...
      setTimeout(() => {
        setPostRequestDetails({});
      }, 4000);
    }
  };

  const handleSubmitError = async (e) => {
    const response = await fetch(submission_url);
    const result = await response.json();
    setPostRequestDetails(result);
    // Make the alert disappear after 4 seconds...
    setTimeout(() => {
      setPostRequestDetails({});
    }, 4000);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <TextField
              required
              name="name"
              id="outlined-name"
              label="Name"
              onChange={handleInputChange}
              value={formValues.name}
              error={'name' in errors && errors.name !== ''}
              helperText={errors.name}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              name="email"
              id="outlined-email"
              label="Email"
              onChange={handleInputChange}
              value={formValues.email}
              error={'email' in errors && errors.email !== ''}
              helperText={errors.email}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              name="publicNoticeText"
              multiline
              id="outlined-text"
              label="Public Notice Text"
              onChange={handleInputChange}
              value={formValues.publicNoticeText}
            />
          </Grid>
        </Grid>
        <Button
          style={{ marginTop: '25px' }}
          variant="contained"
          color="primary"
          type="submit"
          size="10px"
        >
          Submit Notice
        </Button>
      </form>
      <Button
        onClick={handleSubmitError}
        style={{ marginTop: '25px' }}
        variant="contained"
        color="primary"
        type="submit"
        size="10px"
      >
        Submit Notice - Error Banner
      </Button>
    </>
  )
}

export default SubmissionForm;