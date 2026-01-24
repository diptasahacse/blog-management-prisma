import postRouter from "../../modules/post/post.route";
import { Router } from "express";
import postCommentRouter from "../../modules/postComment/postComment.route";
import categoryRouter from "../../modules/category/category.route";
import postCommentLikeRouter from "../../modules/postCommentLike/postCommentLike.route";
import postLikeRouter from "../../modules/postLike/postLike.route";
import tagRouter from "../../modules/tag/tag.route";
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
    path: "/tags",
    routes: tagRouter,
  },
  {
    path: "/post-comment-likes",
    routes: postCommentLikeRouter,
  },
  {
    path: "/post-likes",
    routes: postLikeRouter,
  },
];
moduleRoutes.forEach((moduleRoute) => {
  routes.use(moduleRoute.path, moduleRoute.routes);
});
export default routes;
