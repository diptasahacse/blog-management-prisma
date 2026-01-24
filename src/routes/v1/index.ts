import postRouter from "../../modules/post/post.route";
import { Router } from "express";
import postCommentRouter from "../../modules/postComment/postComment.route";
import categoryRouter from "../../modules/category/category.route";
import postCommentLikeRouter from "../../modules/postCommentLike/postCommentLike.route";
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
  {
    path: "/categories",
    routes: categoryRouter,
  },
  {
    path: "/post-comment-likes",
    routes: postCommentLikeRouter,
  }
];
moduleRoutes.forEach((moduleRoute) => {
  routes.use(moduleRoute.path, moduleRoute.routes);
});
export default routes;
