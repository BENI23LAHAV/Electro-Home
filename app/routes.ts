import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/wrapper.tsx", [
    index("routes/home.tsx"),
    route("/products", "routes/homeProductsComponents.tsx"),
    route("/product/:id", "routes/singlProduct.tsx"),
  ]),
] satisfies RouteConfig;
