import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/navbar.tsx", [
    index("routes/home.tsx"),
    route("/products", "routes/homeProductsComponents.tsx"),
  ]),
] satisfies RouteConfig;
