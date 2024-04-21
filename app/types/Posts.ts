export type PostType = {
  name: string;
  title: string;
  id: string;
  createAt: string;
  user: {
    name: string;
    image: string;
  };
  comments: {
    createdAt?: string;
    id: string;
    postId: string;
    title: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
};
