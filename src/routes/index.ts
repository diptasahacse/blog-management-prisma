import postRouter from "../modules/post/post.route";
import { Router } from "express";
const routes = Router();
const moduleRoutes = [
  {
    path: "/posts",
    routes: postRouter,
  },
];
moduleRoutes.forEach((moduleRoute) => {
  routes.use(moduleRoute.path, moduleRoute.routes);
});
export default routes;
