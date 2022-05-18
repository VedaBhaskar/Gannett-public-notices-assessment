import { Alert, AlertTitle } from '@mui/material';

const AlertBanner = (props) => {
  const { status, message } = props;

  return (
    <Alert severity={status}>
      <AlertTitle>{status[0].toUpperCase() + status.slice(1)}</AlertTitle>
      <strong>{message[0].toUpperCase() + message.slice(1)}</strong>
    </Alert>
  )
};

export default AlertBanner;