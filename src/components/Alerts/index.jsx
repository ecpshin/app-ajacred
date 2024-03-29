import { Alert, Snackbar } from '@mui/material';
import useGeral from '../../hooks/useGeral';

export default function Alerts() {
  const { toast, setToast, useNavigate } = useGeral();
  const navigate = useNavigate();

  const handleOnClose = () => {
    setToast({ ...toast, open: false, message: '', reason: '' });
    navigate('/home');
    return;
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: toast.vertical,
        horizontal: toast.horizontal,
      }}
      open={toast.open}
      autoHideDuration={2000}
      onClose={handleOnClose}
      key={toast.vertical + toast.horizontal}
    >
      <Alert
        onClose={handleOnClose}
        variant='filled'
        severity={toast.reason === 'success' ? 'success' : 'error'}
        sx={{ width: '100%', fontSize: '1.4rem' }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
}
