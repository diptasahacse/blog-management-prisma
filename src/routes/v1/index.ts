import postRouter from "../../modules/post/post.route";
import { Router } from "express";
import postCommentRouter from "../../modules/postComment/postComment.route";
const routes = Router();
const moduleRoutes = [
  {
    path: "/posts",
    routes: postRouter,
  },
  {
    path: "/post-comments",
    routes: postCommentRouter,
  },
];
moduleRoutes.forEach((moduleRoute) => {
  routes.use(moduleRoute.path, moduleRoute.routes);
});
export default routes;
