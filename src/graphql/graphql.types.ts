import { postType } from "../modules/post/post.graphql.type";
import { userType } from "../modules/user/user.graphql.type";
import { paginationType } from "../types/pagination/pagination.graphql.type";

export const gqlTypes = `
${paginationType}
${userType}
${postType}
`;
