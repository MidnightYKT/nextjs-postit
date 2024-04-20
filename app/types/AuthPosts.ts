export type AuthPosts = {
  email: string;
  id: string;
  image: string;
  name: string;
  posts: {
    createAt: string;
    title: string;
    id: string;
    comments: {
      createAt: string;
      id: string;
      postId: string;
      title: string;
      userId: string;
    }[];
  }[];
};
