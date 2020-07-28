import React from "react";
import Image, { Shimmer } from "react-shimmer";
import {
  withStyles,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";

import NotImage from "../../../assets/not-image.png";
import { CapitalizeString } from "../../../helpers/CapitalizeString";
import { MoneyCurrency } from "../../../helpers/MoneyCurrency";

const styles = (theme) => ({
  price: {
    fontSize: 18,
    fontWeight: "700",
  },
  cashbackContainer: {
    color: "#1d1d1d80",
  },
  cashback: {
    fontSize: 10,
  },
  iconCashback: {
    display: "flex",
    paddingRight: 4,
  },
  cashbackPercentage: {
    color: theme.palette.primary.main,
  },
});

const CardProduct = ({ classes, id, name, image, price, setProductsCart }) => {
  return (
    <Card>
      <CardContent>
        <Grid item style={{ display: "flex", justifyContent: "center" }}>
          <Image
            NativeImgProps={{
              style: {
                width: 96,
                height: "auto",
              },
            }}
            src={image ? image : NotImage}
            fallback={<Shimmer width={"100%"} height={96} />}
          />
        </Grid>
        <Typography gutterBottom>{CapitalizeString(name)}</Typography>
        <Typography className={classes.price}>
          {MoneyCurrency(price)}
        </Typography>
        <Grid
          container
          alignItems="center"
          wrap="nowrap"
          className={classes.cashbackContainer}
        >
          <Grid item className={classes.iconCashback}>
            <MonetizationOnRoundedIcon fontSize="small" />
          </Grid>
          <Grid item>
            <Typography className={classes.cashback}>
              {`Receba ${MoneyCurrency(price / 10)}`}
              <span className={classes.cashbackPercentage}>(10% de volta)</span>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => {
            setProductsCart((currentProducts) => {
              const productComplete = {
                id,
                name: CapitalizeString(name),
                image,
                price,
                quantity: 1,
              };

              const exists = currentProducts.find(
                (product) => product.id === productComplete.id
              );

              if (exists === undefined) {
                return [...currentProducts, { ...productComplete }];
              } else {
                // eslint-disable-next-line
                currentProducts.map((product) => {
                  if (product.id === exists.id) {
                    product.quantity += 1;
                  }
                });
                return [...currentProducts];
              }
            });
          }}
        >
          Comprar
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(CardProduct);
