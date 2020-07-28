import React, { useState, useEffect } from "react";
import {
  withStyles,
  Grid,
  Typography,
  Divider,
  Switch,
  Button,
} from "@material-ui/core";
import { MoneyCurrency } from "../../../helpers/MoneyCurrency";
import CustomLayoutSummary from "./CustomLayoutSummary";
import ModalCheckout from "./ModalCheckout";

const styles = (theme) => ({
  titleCart: {
    textTransform: "uppercase",
  },
  balance: {
    fontWeight: "600",
    fontSize: 18,
    color: `${theme.palette.default.black}80`,
  },
  summaryContainer: {
    marginTop: 150,
    [theme.breakpoints.down('sm')]: {
      marginTop: 90
    }
  }
});

const sumValues = (accumulator, currentValue) => accumulator + currentValue;

const CartSummary = ({
  classes,
  valuesProducts,
  balanceAvailable,
  setBalanceAvailable,
  setProductsCart,
  handleCart
}) => {
  const [useBalance, setUseBalance] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [balanceToUse, setBalanceToUse] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [cashback, setCashback] = useState(0);

  const handleChangeBalance = (event) => {
    setUseBalance(event.target.checked);
  };

  useEffect(() => {
    if (valuesProducts.reduce(sumValues) < balanceAvailable) {
      setTotalValue(valuesProducts.reduce(sumValues));
      if (useBalance) {
        setBalanceToUse(valuesProducts.reduce(sumValues));
        setTotalValue(0);
      }
    } else {
      if (useBalance) {
        setBalanceToUse(balanceAvailable);
        setTotalValue(valuesProducts.reduce(sumValues) - balanceAvailable);
      } else {
        setTotalValue(valuesProducts.reduce(sumValues));
      }
    }
  }, [valuesProducts, useBalance, balanceAvailable]);

  useEffect(() => {
    setCashback(totalValue / 10);
  }, [totalValue]);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    console.log("here");
    setOpenDialog(false);
    if (valuesProducts.reduce(sumValues) < balanceAvailable) {
      console.log("entrou no menor");
      if (useBalance) {
        setBalanceAvailable(
          balanceAvailable - valuesProducts.reduce(sumValues) + cashback
        );
      } else {
        setBalanceAvailable(balanceAvailable + cashback);
      }
    } else {
      if (useBalance) {
        setBalanceAvailable(cashback);
      } else {
        setBalanceAvailable(balanceAvailable + cashback);
      }
    }
    setProductsCart([])
    setUseBalance(false);
    handleCart(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item className={classes.summaryContainer}>
        <Typography variant="h2" className={classes.titleCart}>
          Resumo do Carrinho
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <CustomLayoutSummary
              name="subtotal"
              leftText="Subtotal"
              rightText={MoneyCurrency(valuesProducts.reduce(sumValues))}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography className={classes.balance}>Usar saldo</Typography>
              </Grid>
              <Grid item>
                <Switch
                  checked={useBalance}
                  onChange={handleChangeBalance}
                  name="balance"
                  color="primary"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <CustomLayoutSummary
          style={{ visibility: useBalance ? "visible" : "hidden" }}
          leftText="Saldo"
          rightText={`-${MoneyCurrency(balanceToUse)}`}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomLayoutSummary
          name="total"
          leftText="Total"
          rightText={MoneyCurrency(totalValue)}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleClickOpen}
        >
          Finalizar Compra
        </Button>
      </Grid>
      <ModalCheckout
        openDialog={openDialog}
        handleClose={handleClose}
        total={totalValue}
      />
    </Grid>
  );
};

export default withStyles(styles)(CartSummary);
