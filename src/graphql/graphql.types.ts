import { postType } from "../modules/post/post.graphql.type";
import { userType } from "../modules/user/user.graphql.type";
import { commonType } from "./graphql.common.type";

export const gqlTypes = `
${commonType}
${userType}
${postType}
`;
