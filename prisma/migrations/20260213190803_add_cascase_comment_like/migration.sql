-- DropForeignKey
ALTER TABLE "post_comment_likes" DROP CONSTRAINT "post_comment_likes_post_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "post_comment_likes" DROP CONSTRAINT "post_comment_likes_post_id_fkey";

-- DropForeignKey
ALTER TABLE "post_comment_likes" DROP CONSTRAINT "post_comment_likes_user_id_fkey";

-- AddForeignKey
ALTER TABLE "post_comment_likes" ADD CONSTRAINT "post_comment_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comment_likes" ADD CONSTRAINT "post_comment_likes_post_comment_id_fkey" FOREIGN KEY ("post_comment_id") REFERENCES "post_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comment_likes" ADD CONSTRAINT "post_comment_likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
