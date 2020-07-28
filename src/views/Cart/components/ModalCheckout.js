import React from "react";
import {
  withStyles,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import { MoneyCurrency } from "../../../helpers/MoneyCurrency";

const styles = (theme) => ({
  messageCashback: {
    color: theme.palette.primary.main,
    fontSize: 20,
    fontWeight: '700'
  }
});

const ModalCheckout = ({ classes, openDialog, handleClose, total }) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="dialog-checkout"
      open={openDialog}
    >
      <DialogTitle id="dialog-checkout" onClose={handleClose}>
        Obrigado pela Compra
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom className={classes.messageCashback}>
            {`Você recebeu ${MoneyCurrency(total/10)} de volta`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} variant="contained" color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(ModalCheckout);
