import React from "react";
import { withStyles, Grid, Typography } from "@material-ui/core";

const styles = (theme) => ({
  subtotal: {
    fontWeight: '600',
    fontSize: 18,
    color: `${theme.palette.default.black}80`
  },
  total: {
    fontWeight: '700',
    fontSize: 18
  },
  balance: {
    fontWeight: '700',
    fontSize: 18,
    color: theme.palette.primary.main
  }
});

const LayoutSummary = ({ name, classes, style, leftText, rightText }) => {
  return (
    <Grid style={{ ...style }} container justify="space-between">
      <Grid item>
        {name === "subtotal" ? (
          <Typography className={classes.subtotal}>{leftText}</Typography>
        ) : name === 'total' ? (
          <Typography className={classes.total}>{leftText}</Typography>
        ) : (
          <Typography className={classes.balance}>{leftText}</Typography>
        )}
      </Grid>
      <Grid item>
      {name === "subtotal" ? (
          <Typography className={classes.subtotal}>{rightText}</Typography>
        ) : name === 'total' ? (
          <Typography className={classes.total}>{rightText}</Typography>
        ) : (
          <Typography className={classes.balance}>{rightText}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(LayoutSummary);
