export const userType = `
enum USER_ROLE {
  USER
  ADMIN
}
type User {
  id: ID!
  name: String!
  email: String!
  emailVerified: Boolean!
  image: String
  role: USER_ROLE!
  phone: String
  posts: [Post]
  createdAt: String!
  updatedAt: String
}
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    getUserPagination(page: Int!, perPage: Int!): UserPagination

  }

    type UserPagination {
      total: Int!
      page: Int!
      perPage: Int!
      data: [User]
    }

`;
