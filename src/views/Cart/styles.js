export default (theme) => ({
  titleCart: {
    textTransform: "uppercase",
  },
  productImage: {
    border: "1px solid",
    borderRadius: theme.spacing(0.5),
  },
  deleteButton: {
    padding: 0,
    color: `${theme.palette.default.black}80`,
    fontWeight: "600",
    textTransform: "initial",
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
  },
  productPrice: {
    color: theme.palette.primary.light,
    fontSize: 16,
    fontWeight: "700",
  },
  cartContainer: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      padding: theme.spacing(3)
    },
  },
});
