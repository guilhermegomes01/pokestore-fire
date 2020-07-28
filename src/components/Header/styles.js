export default (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  typeStore: {
    color: theme.palette.default.white,
    textTransform: "uppercase",
    "&::before": {
      content: '" "',
      display: "block",
      height: 2,
      width: "100%",
      backgroundColor: "white",
    },
    "&::after": {
      content: '" "',
      display: "block",
      height: 2,
      width: "100%",
      backgroundColor: "white",
    },
  },
  searchBar: {
    backgroundColor: theme.palette.default.white,
    borderRadius: 5,
  },
  iconBalance: {
    fontSize: 46,
    color: theme.palette.default.white,
  },
  balanceTitle: {
    fontWeight: "700",
  },
  centerResponsive: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "flex-start",
    },
  },
  balanceValue: {
    fontSize: 13,
    fontWeight: '600'
  }
});
