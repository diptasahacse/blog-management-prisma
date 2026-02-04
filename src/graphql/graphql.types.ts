import { postType } from "../modules/post/post.graphql.type";
import { userType } from "../modules/user/user.graphql.type";

export const gqlTypes = `
${userType}
${postType}
`;
