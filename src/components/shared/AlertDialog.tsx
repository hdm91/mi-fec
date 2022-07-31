import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { isFunction } from '../../utils';

interface AlertDialogProps {
  title?: string;
  message: string;
  visible: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

const AlertDialog = (props: AlertDialogProps) => {
  const { title, message, visible, onOk, onCancel } = props;

  const handleClose = () => {
    if (isFunction(onCancel)) {
      onCancel();
    }
  };

  const handleOk = () => {
    if (isFunction(onOk)) {
      onOk();
    }
  };

  return (
    <Dialog open={visible} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title ? title : ''}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleOk} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
