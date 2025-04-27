import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/wrapper.tsx", [
    route("/:category?", "routes/home.tsx"),
    route("/product/:id/:message?/:success?", "routes/singlProduct.tsx"),
    route("/cart", "routes/shoppingCart.tsx"),
  ]),
] satisfies RouteConfig;
