export const postType = `
 enum PostStatus {
          DRAFT
          PUBLISHED
          ARCHIVED
      }

type Post{
        id: ID!
        title: String!
        content: String!
        thumbnail: String
        status: PostStatus!
        views: Int!
        owner_id: ID!
        user: User
        createdAt: String!
        updatedAt: String
    }
        type PostPagination {
            total: Int!
            page: Int!
            perPage: Int!
            data: [Post]
        }


    type Query{
        getPosts: [Post]
        getPost(id: ID!): Post
        getPostPagination(page: Int!, perPage: Int!): PostPagination
    }

`;
