import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/wrapper.tsx", [
    route("/", "routes/home.tsx"),
    route("/product/:id/", "routes/singlProduct.tsx"),
    route("/cart", "routes/shoppingCart.tsx"),
  ]),
] satisfies RouteConfig;
