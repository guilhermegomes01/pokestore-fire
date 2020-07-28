import React, { useState, useEffect } from "react";
import {
  withStyles,
  Grid,
  Container,
  Typography,
  Hidden,
  SwipeableDrawer,
  Fab,
  Badge,
} from "@material-ui/core";

import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";

// Internal Components
import Header from "../../components/Header";
import Cart from "../Cart";
import CardProduct from "./components/CardProduct";
import { getType, getPokemon } from "../../services/pokeAPI";

const styles = (theme) => ({
  root: {
    minHeight: "100%",
    backgroundColor: theme.palette.default.lightGrey,
  },
  subtitleProducts: {
    textTransform: "uppercase",
  },
  productColumn: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(0),
      padding: "48px !important",
    },
  },
  cartColumn: {
    backgroundColor: theme.palette.common.white,
    marginTop: theme.spacing(3),
  },
  iconCart: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

const Home = ({ classes }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [productsCart, setProductsCart] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [balanceAvailable, setBalanceAvailable] = useState(40);
  const [pokemonFiltered, setPokemonFiltered] = useState([]);
  const [pokemonInitial, setPokemonInitial] = useState(true);
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    getType().then((data) => {
      data.pokemon.map((pokemon) => {
        return getPokemon(pokemon.pokemon.url).then((onePokemon) => {
          setPokemonList((currentPokemon) => {
            return [...currentPokemon, { ...onePokemon }];
          });
        });
      });
    });
    // getPokemon("https://pokeapi.co/api/v2/pokemon?limit=10").then((one) => {
    //   one.results.map((result) => {
    //     return getPokemon(result.url).then((one) => {
    //       setPokemonList((cur) => {
    //         return [...cur, { ...one }];
    //       });
    //     });
    //   });
    // });
  }, []);

  const searchOnProducts = (value) => {
    const inputValue = value.toLowerCase();
    const pokemonFilter = pokemonList.filter((pokemon) => {
      return pokemon.name.includes(inputValue);
    });

    setPokemonFiltered(pokemonFilter);
    setPokemonInitial(false);
  };

  const handleCart = (value) => {
    setOpenCart(value);
  };

  return (
    <Container maxWidth={false} className={classes.root} disableGutters>
      <Header
        balanceAvailable={balanceAvailable}
        searchOnProducts={searchOnProducts}
      />
      <Container>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8} className={classes.productColumn}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Typography variant="h2" className={classes.subtitleProducts}>
                  Pokémon
                </Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  {pokemonFiltered.length > 0 ? (
                    pokemonFiltered.map((pokemon) => (
                      <Grid key={pokemon.id} item xs={6} sm={4} lg={3}>
                        <CardProduct
                          id={pokemon.id}
                          name={pokemon.name}
                          image={pokemon.sprites.front_default}
                          price={pokemon.weight}
                          setProductsCart={setProductsCart}
                        />
                      </Grid>
                    ))
                  ) : pokemonInitial ? (
                    pokemonList.map((pokemon) => (
                      <Grid key={pokemon.id} item xs={6} sm={4} lg={3}>
                        <CardProduct
                          id={pokemon.id}
                          name={pokemon.name}
                          image={pokemon.sprites.front_default}
                          price={pokemon.weight}
                          setProductsCart={setProductsCart}
                        />
                      </Grid>
                    ))
                  ) : (
                    <Grid item>
                      <Typography>Nenhum produto foi encontrado!</Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid item xs={4} className={classes.cartColumn}>
              <Cart
                balanceAvailable={balanceAvailable}
                setBalanceAvailable={setBalanceAvailable}
                productsCart={productsCart}
                setProductsCart={setProductsCart}
                handleCart={handleCart}
              />
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item className={classes.iconCart}>
              <Badge badgeContent={productsCart.length} overlap="circle" color="error">
                <Fab color="primary" onClick={() => handleCart(true)}>
                  <ShoppingCartRoundedIcon />
                </Fab>
              </Badge>
            </Grid>
            <Grid item>
              <SwipeableDrawer
                anchor="right"
                open={openCart}
                onClose={() => handleCart(false)}
                onOpen={() => handleCart(true)}
              >
                <Cart
                  balanceAvailable={balanceAvailable}
                  setBalanceAvailable={setBalanceAvailable}
                  productsCart={productsCart}
                  setProductsCart={setProductsCart}
                  handleCart={handleCart}
                />
              </SwipeableDrawer>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </Container>
  );
};

export default withStyles(styles)(Home);
