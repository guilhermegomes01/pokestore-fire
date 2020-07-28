import React, { useState } from "react";
import {
  withStyles,
  Grid,
  Typography,
  Container,
  InputAdornment,
  OutlinedInput,
  IconButton,
  Hidden,
} from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";

// Internal Components
import styles from "./styles";
import logo from "../../assets/logo.svg";
import { MoneyCurrency } from "../../helpers/MoneyCurrency";

const Header = ({ classes, balanceAvailable, searchOnProducts }) => {
  const [searchBarText, setSearchBarText] = useState("");
  return (
    <Container maxWidth={false} className={classes.root}>
      <Container>
        {/* Versão Desktop */}
        <Hidden smDown>
          <Grid
            container
            justify="space-between"
            spacing={2}
            alignItems="center"
          >
            <Grid item md={4}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <img src={logo} alt="Pokémon Store - Logo" />
                </Grid>
                <Grid item>
                  <Typography className={classes.typeStore} variant="h1">
                    Fire
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={5}>
              <OutlinedInput
                fullWidth
                placeholder="Busque aqui seu produto"
                className={classes.searchBar}
                variant="outlined"
                size="medium"
                value={searchBarText}
                onChange={(e) => setSearchBarText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    searchOnProducts(searchBarText);
                  }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => searchOnProducts(searchBarText)}>
                      <SearchIcon color="primary" />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item md={3}>
              <Grid
                container
                spacing={1}
                justify="flex-end"
                alignItems="center"
              >
                <Grid item>
                  <AccountCircle className={classes.iconBalance} />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    className={classes.balanceTitle}
                  >
                    Saldo Disponível
                  </Typography>
                  <Typography className={classes.balanceValue} variant="caption" color="textSecondary">
                    {MoneyCurrency(balanceAvailable)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        {/* Versão Mobile */}
        <Hidden mdUp>
          <Grid container direction="column" wrap="nowrap" spacing={2}>
            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    className={classes.centerResponsive}
                  >
                    <Grid item>
                      <img src={logo} alt="Pokémon Store - Logo" />
                    </Grid>
                    <Grid item>
                      <Typography className={classes.typeStore} variant="h1">
                        Fire
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Grid
                    container
                    spacing={1}
                    justify="flex-end"
                    alignItems="center"
                    className={classes.centerResponsive}
                  >
                    <Grid item>
                      <AccountCircle className={classes.iconBalance} />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        className={classes.balanceTitle}
                      >
                        Saldo Disponível
                      </Typography>
                      <Typography className={classes.balanceValue} variant="caption" color="textSecondary">
                        {MoneyCurrency(balanceAvailable)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <OutlinedInput
                fullWidth
                placeholder="Busque aqui seu produto"
                className={classes.searchBar}
                variant="outlined"
                size="medium"
                value={searchBarText}
                onChange={(e) => setSearchBarText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    searchOnProducts(searchBarText);
                  }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => searchOnProducts(searchBarText)}>
                      <SearchIcon color="primary" />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
        </Hidden>
      </Container>
    </Container>
  );
};

export default withStyles(styles)(Header);
